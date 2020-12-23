using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if(!context.Visits.Any())
            {
                var visits = new List<Visit>
                {
                    new Visit
                    {
                        Title = "Wizyta 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "EKG",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 1,
                    },
                    new Visit
                    {
                        Title = "Wizyta 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Ból serca",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 1,
                    },
                    new Visit
                    {
                        Title = "Wizyta 3",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Ból serca",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 2,
                    },
                    new Visit
                    {
                        Title = "Wizyta 4",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "EKG",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 2,
                    },
                    new Visit
                    {
                        Title = "Wizyta 5",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "EKG",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 3,
                    },
                    new Visit
                    {
                        Title = "Wizyta 6",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "zeby do leczenia",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 3,
                    },
                    new Visit
                    {
                        Title = "Wizyta 7",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "zeby do wyrwania",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 4,
                    },
                    new Visit
                    {
                        Title = "Wizyta 8",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "badanie kontrolne",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 4,
                    },
                    new Visit
                    {
                        Title = "Wizyta 9",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "brak zebow",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 5,
                    },
                    new Visit
                    {
                        Title = "Wizyta 10",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "wyrwanie zebow",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 5,
                    }
                };
                context.Visits.AddRange(visits);
                
                context.SaveChanges();
            }
        }
    }
}