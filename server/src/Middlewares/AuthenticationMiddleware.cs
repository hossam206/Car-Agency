
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Middlewares
{
    public class AuthenticationMiddleware : IMiddleware
    {
        private readonly string _key;

        public AuthenticationMiddleware()
        {
            _key = Environment.GetEnvironmentVariable("KEY");
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (!context.Request.Cookies.TryGetValue("AuthToken", out var token))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsJsonAsync("Unauthorized: No token provided.");
            }
            var principal = VerifyToken(token);
            if (principal == null)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsJsonAsync("Invalid Auth Token.");
            }
            context.User = principal;
            await next(context);
        }

        public ClaimsPrincipal VerifyToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key);
            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}




