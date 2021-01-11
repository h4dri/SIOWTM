using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values {get; set;}
        public DbSet<Visit> Visits {get; set;}
        public DbSet<UserVisit> UserVisits {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );

            builder.Entity<UserVisit>(x => x.HasKey(ua =>
                new { ua.AppUserId, ua.VisitId }));

            builder.Entity<UserVisit>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserVisits)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserVisit>()
                .HasOne(a => a.Visit)
                .WithMany(u => u.UserVisits)
                .HasForeignKey(a => a.VisitId);
        
        }
    } 
}