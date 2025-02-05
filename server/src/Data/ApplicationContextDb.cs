using Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class ApplicationContextDb:DbContext
    {
        public ApplicationContextDb(DbContextOptions<ApplicationContextDb> options) :base(options) {
        
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<User>  Users { get; set; }
        public DbSet<Item> Items { get; set; }
    }
}
