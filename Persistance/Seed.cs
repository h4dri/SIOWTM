using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistance;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        IsDoctor = false,
                        Subscribe = false
                        
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        IsDoctor = false,
                        Subscribe = false
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        IsDoctor = false,
                        Subscribe = false
                    },
                    new AppUser
                    {
                        Id = "d",
                        DisplayName = "doctor1",
                        UserName = "doctor1",
                        Email = "doctor1@doctor.com",
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        IsDoctor = true,
                        Subscribe = false
                    },
                    new AppUser
                    {
                        Id = "e",
                        DisplayName = "doctor2",
                        UserName = "doctor2",
                        Email = "doctor2@doctor.com",
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        IsDoctor = true,
                        Subscribe = false
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Visits.Any())
            {
                var visits = new List<Visit>
                {
                    new Visit
                    {
                        Title = "Visit 1",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Visit 2 months in future",
                        Category = "kardiologia",
                        DocName = "doctor1",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserVisit
                            {
                                AppUserId = "d",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            }
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 2",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Visit 1 months in future",
                        Category = "kardiologia",
                        DocName = "doctor1",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserVisit
                            {
                                AppUserId = "d",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 3",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Visit 1 month in future",
                        Category = "kardiologia",
                        DocName = "doctor1",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserVisit
                            {
                                AppUserId = "d",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 4",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Visit 1 months in future",
                        Category = "stomatologia",
                        DocName = "doctor2",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 5",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Visit 2 months in future",
                        Category = "stomatologia",
                        DocName = "doctor2",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 6",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Visit 2 months in future",
                        Category = "stomatologia",
                        DocName = "doctor2",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 7",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Visit 4 months in future",
                        Category = "stomatologia",
                        DocName = "doctor2",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 8",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Visit 3 months in future",
                        Category = "stomatologia",
                        DocName = "doctor2",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 9",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Visit 5 months in future",
                        Category = "stomatologia",
                        DocName = "doctor2",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Visit 10",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Visit 8 months in future",
                        Category = "stomatologia",
                        DocName = "doctor2",
                        isEnded = false,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    }
                };

                await context.Visits.AddRangeAsync(visits);
                await context.SaveChangesAsync();
            }
        }
    }
}