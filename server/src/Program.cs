global using System;
using Server;
using Serilog;


public class Program {


    public static void Main(string[] args) {

        // Logger
        Log.Logger = new LoggerConfiguration()
            .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day,
                outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss} {SourceContext}] {Message:lj}{NewLine}{Exception}")
            .CreateLogger();
        try
        {
            Log.Information("Starting the application...");
            CreateHostBuilder(args).Build().Run();
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Application startup failed!");
        }
        finally
        {
            Log.CloseAndFlush();
        }
        
        CreateHostBuilder(args).Build().Run();
    }
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args).
       UseSerilog().ConfigureWebHostDefaults(webBuilder =>
       {
           webBuilder.UseStartup<Startup>();
       });
}
