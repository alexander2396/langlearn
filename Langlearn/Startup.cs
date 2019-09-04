using AutoMapper;
//using FluentValidation.AspNetCore;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
//using NSwag.AspNetCore;
using System.Reflection;
using Langlearn.Application.Infrastructure;
using Langlearn.Application.Infrastructure.AutoMapper;
using Langlearn.Application.Interfaces;
using Langlearn.Application.Languages.Queries.GetLanguagesList;
//using Northwind.Common;
//using Northwind.Infrastructure;
using Langlearn.DataAccess;
//using Northwind.WebUI.Filters;

namespace Langlearn.WebUI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			// Add AutoMapper
			services.AddAutoMapper(new Assembly[] { typeof(AutoMapperProfile).GetTypeInfo().Assembly });

			// Add framework services.
			//services.AddTransient<INotificationService, NotificationService>();
			//services.AddTransient<IDateTime, MachineDateTime>();

			// Add MediatR
			services.AddMediatR(typeof(GetLanguagesListQueryHandler).GetTypeInfo().Assembly);
			//services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
			services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

			services.AddDbContext<IWestLanguagesContext, WestLanguagesContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("WestLanguagesDatabase")));

			services.AddMvc();

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

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			//app.UseSwaggerUi3(settings =>
			//{
			//	settings.Path = "/api";
			//	settings.DocumentPath = "/api/specification.json";
			//});

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
				}
			});
		}
	}
}
