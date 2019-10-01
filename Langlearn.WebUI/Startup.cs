using AutoMapper;
using FluentValidation.AspNetCore;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using System.Reflection;
using Langlearn.Application.Infrastructure;
using Langlearn.Application.Infrastructure.AutoMapper;
using Langlearn.Application.Interfaces;
using Langlearn.Application.WestLanguages.Languages.Queries.GetLanguagesList;
using Langlearn.Application.WestLanguages.Words.Commands.CreateWord;
using Langlearn.Application.Infrastructure.Providers;
using Langlearn.DataAccess;
using Langlearn.Infrastructure.TextToSpeech;

namespace Langlearn.WebUI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;

            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "C:/Users/okalashnykov/source/My First Project-ea28210ed1a1.json");

        }

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            // Add AutoMapper
            services.AddAutoMapper(new Assembly[] { typeof(AutoMapperProfile).GetTypeInfo().Assembly });

			// Add framework services.
			//services.AddTransient<INotificationService, NotificationService>();
			//services.AddTransient<IDateTime, MachineDateTime>();

			// Add MediatR
			services.AddMediatR(typeof(GetLanguagesListQueryHandler).GetTypeInfo().Assembly);
			//services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
			services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            services.AddTransient<ITextToSpeechService, TextToSpeechService>();

            services.AddTransient<IAuthorizationProvider, AuthorizationProvider>();

			services.AddDbContext<ILanguagerContext, LanguagerContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("LanguagerDatabase")));

			services.AddMvc()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssembly(typeof(CreateWordCommandValidator).Assembly));

			// Customise default API behavour
			services.Configure<ApiBehaviorOptions>(options =>
			{
				options.SuppressModelStateInvalidFilter = true;
			});
		}
		
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseDatabaseErrorPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

            app.UseCors(builder =>
            {
                builder
                    .WithOrigins(Configuration.GetSection("AllowedOrigins").Get<string[]>())
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });

            app.UseHttpsRedirection();
			app.UseStaticFiles();
			//app.UseSpaStaticFiles();

			//app.UseSwaggerUi3(settings =>
			//{
			//	settings.Path = "/api";
			//	settings.DocumentPath = "/api/specification.json";
			//});

			app.UseMvc();
		}
	}
}
