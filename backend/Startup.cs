using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using UserApi.Models;
using UserApi.Services;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<UsersDatabaseSettings>(
                Configuration.GetSection(nameof(UsersDatabaseSettings)));
            services.AddSingleton<IUsersDatabaseSettings>(sp=>
                sp.GetRequiredService<IOptions<UsersDatabaseSettings>>().Value);
            
            services.AddSingleton<UserService>();
            services.AddCors(options =>{
                options.AddPolicy(MyAllowSpecificOrigins,
                buider =>{
                    buider.WithOrigins("http://localhost:8080")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();  
                });
            });
            services.AddMvc()
                    .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors(MyAllowSpecificOrigins);
            app.UseMvc();
        }
    }
}
