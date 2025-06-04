//using Bl;
//using Dal;
//using Dal.models;
//using Bl.Services;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
//using System;
//using System.Collections.Generic;
//using Server;

//var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddHttpContextAccessor();

//builder.Services.AddControllers();

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });
//    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//    {
//        Name = "Authorization",
//        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
//        Scheme = "Bearer",
//        BearerFormat = "JWT",
//        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
//        Description = "הכניסי את הטוקן כאן. דוגמה: Bearer xxxxxx.yyyyy.zzzzz"
//    });
//    builder.Services.AddCors(options =>
//    {
//        options.AddPolicy("AllowSpecificOrigin",
//            builder => builder.WithOrigins("http://localhost:5173") // כתובת ה-React שלך
//                              .AllowAnyMethod()
//                              .AllowAnyHeader());
//    });

//    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
//    {
//        {
//            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//            {
//                Reference = new Microsoft.OpenApi.Models.OpenApiReference
//                {
//                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//}); builder.Services.AddSingleton<IBlManager, BlManager>(); 
//builder.Services.AddSingleton<IDalManager, DalManager>();
//builder.Services.AddControllers();
//builder.Services.AddDbContext<dbClass>(options =>
//	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//builder.Services.AddAutoMapper(typeof(MappingProfile));
//builder.Services.AddSingleton(new JwtService("my-very-strong-secret-key-123456", 60)); // 60 דקות
//builder.Services.AddAuthentication("Bearer")
//    .AddJwtBearer("Bearer", options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = false,
//            ValidateAudience = false,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-very-secret-key"))
//        };
//    });
//builder.Services.AddHostedService<CarAvailabilityService>();
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("UserPolicy", policy => policy.RequireRole("User"));
//});
//var app = builder.Build();
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
//app.UseHttpsRedirection();
//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllers();

//app.Run();

using Bl;
using Dal;
using Dal.models;
using Bl.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using Server;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "הכניסי את הטוקן כאן. דוגמה: Bearer xxxxxx.yyyyy.zzzzz"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// הוספת מדיניות CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173") // כתובת ה-React שלך
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddSingleton<IBlManager, BlManager>();
builder.Services.AddSingleton<IDalManager, DalManager>();
builder.Services.AddDbContext<dbClass>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddSingleton(new JwtService("my-very-strong-secret-key-123456", 60)); // 60 דקות
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-very-secret-key"))
        };
    });
builder.Services.AddHostedService<CarAvailabilityService>();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("UserPolicy", policy => policy.RequireRole("User"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin"); // הפעלת מדיניות CORS
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

