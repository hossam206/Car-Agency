using DotNetEnv;
using Server.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IO.Compression;
using System.Text;
using Server.Models;
using Server.Services;
using Server.Repositorys;

namespace Server
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly string _connectionString;
        public Startup(IConfiguration configuration)
        {

            Configuration = configuration;
            Env.Load();
            _connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        }


        public void ConfigureServices(IServiceCollection services)
        {
            // Dependency Injection

            // Database Context
            services.AddDbContext<ApplicationContextDb>(options =>
                options.UseSqlServer(_connectionString)
            );

            //  Gzip Compression 
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = true;
            });

            // Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "your_issuer",
                    ValidAudience = "your_audience",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key"))
                };
            });

            // Authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("UserOrAdminPolicy", policy =>
                    policy.RequireRole("Admin", "User"));
            });

            // Swagger 
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "MY API",
                    Version = "v1",
                    Description = "Api of Car-Agency in Swagger"
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Description = "Enter 'Bearer [your token]'",
                    Type = SecuritySchemeType.ApiKey,
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {}
                }
            });

                // Use this to automatically map enums to OpenAPI specs
                c.UseInlineDefinitionsForEnums();
            });


            // CORS 
            services.AddCors(option =>
            {
                option.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .SetPreflightMaxAge(TimeSpan.FromSeconds(10));
                });
            });

            // Rate Limiter 
            services.AddRateLimiter(options =>
            {
                options.AddFixedWindowLimiter("fixed", policy =>
                {
                    policy.Window = TimeSpan.FromSeconds(10);
                    policy.PermitLimit = 10;
                });

                options.OnRejected = async (context, cancellationToken) =>
                {
                    context.HttpContext.Response.StatusCode = 429;
                    await context.HttpContext.Response.WriteAsync("Too Many Requests", cancellationToken);
                };
            });

            // Middlewares

            // Services
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IQRCodeService, QRCodeService>();

            // Reposeitorys
            services.AddScoped<ItemRepository>();
            services.AddScoped<UserRepository>();
            services.AddScoped<QRCodeRepository>();

            // Controllers
            services.AddControllers();
            services.AddRazorPages();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
                    c.RoutePrefix = string.Empty;
                });

            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            // Delete from response Headers
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Remove("Server");
                context.Response.Headers.Remove("X-Powered-By");
                context.Response.Headers.Remove("ETag");
                context.Response.Headers["X-Frame-Options"] = "DENY";
                context.Response.Headers["X-Content-Type-Options"] = "nosniff";
                context.Response.Headers["Referrer-Policy"] = "no-referrer";
                context.Response.Headers["Content-Security-Policy"] =
                    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
                await next();
            });

            app.UseResponseCompression();
            app.UseRouting();
            app.UseRateLimiter();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();

            // Expect path [ login - view ]
            app.UseWhen(context =>
            !context.Request.Path.StartsWithSegments("/api/auth/login") &&
            !context.Request.Path.StartsWithSegments("/api/car/view"),
              appBuilder =>
              {
                  // Here middleWare
              });

            app.UseEndpoints(endpoints =>
            {
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapRazorPages();
                });
            });
        }
    }
}
