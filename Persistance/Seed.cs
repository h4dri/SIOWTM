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
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
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
                        Title = "Past Visit 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Visit 2 months ago",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 1,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Visit
                    {
                        Title = "Past Visit 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Visit 1 month ago",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 1,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Visit 1 month in future",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 2,
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
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Visit 2 months in future",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 2,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Visit 3 months in future",
                        Category = "kardiolog",
                        DoctorId = 1,
                        PatientId = 3,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Visit 4 months in future",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 3,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Visit 5 months in future",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 4,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Visit 6 months in future",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 4,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Visit 7 months in future",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 5,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Future Visit 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Visit 8 months in future",
                        Category = "dentysta",
                        DoctorId = 2,
                        PatientId = 5,
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserVisit
                            {
                                AppUserId = "a",
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