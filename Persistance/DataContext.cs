using Domain;
using Microsoft.EntityFrameworkCore;
using System;


namespace Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values {get; set;}
                public DbSet<Visit> Visits {get; set;}

        protected override void OnModelCreating(ModelBuilder buildier)
        {
            buildier.Entity<Value>()
            .HasData(
                new Value {Id = 1, Name = "Value 101"},
                new Value {Id = 2, Name = "Value 102"},
                new Value {Id = 3, Name = "Value 103"}
            );
        }
    }
}