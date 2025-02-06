using Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class ApplicationContextDb : DbContext
    {
        public ApplicationContextDb(DbContextOptions<ApplicationContextDb> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>(entity => entity.Property(i => i.Id).ValueGeneratedOnAdd());

            modelBuilder.Entity<Item>().HasData(new Item
            {
                Id = -2,
                VehicleType = "Sedan",
                ExportPlateNumber = "EXP12345",
                RegistrationPlateNumber = "ABC123",
                RegistrationDate = "2024-01-01",
                RegistrationExpiryDate = "2025-01-01",
                VehicleMake = "Toyota",
                Category = "Private",
                ModelYear = "2023",
                CountryOfOrigin = "Japan",
                VehicleColor = "White",
                ChassisNumber = "CHS123456789",
                EngineNumber = "ENG987654321",
                NumberOfDoors = 4,
                FuelType = "Petrol",
                NumberOfSeats = 5,
                EmptyWeight = 1500,
                InsuranceCompany = "AXA",
                InsuranceType = "Comprehensive",
                InsurancePolicyNumber = "INS123456",
                InsuranceExpiryDate = "2025-06-30",
                OwnerName = "John Doe",
                Nationality = "American",
                PassportNumber = "P123456789",
                TrafficCodeNumber = "TC987654",
                EmiratesIdNumber = "EID123456789",
                DriverName = "John Doe",
                LicenseNumber = "LN123456",
                DriverNationality = "American",
                LicenseSource = "USA",
                CertificateIssueDate = "2024-02-01",
                CertificateReferenceNumber = "CERT987654"
            },
             new Item
             {
                 Id = -1,
                 VehicleType = "SUV",
                 ExportPlateNumber = "EXP67890",
                 RegistrationPlateNumber = "XYZ789",
                 RegistrationDate = "2023-05-10",
                 RegistrationExpiryDate = "2024-05-10",
                 VehicleMake = "Ford",
                 Category = "Private",
                 ModelYear = "2022",
                 CountryOfOrigin = "USA",
                 VehicleColor = "Black",
                 ChassisNumber = "CHS987654321",
                 EngineNumber = "ENG123456789",
                 NumberOfDoors = 5,
                 FuelType = "Diesel",
                 NumberOfSeats = 7,
                 EmptyWeight = 2000,
                 InsuranceCompany = "Allianz",
                 InsuranceType = "Third Party",
                 InsurancePolicyNumber = "INS987654",
                 InsuranceExpiryDate = "2024-12-31",
                 OwnerName = "Jane Smith",
                 Nationality = "British",
                 PassportNumber = "P987654321",
                 TrafficCodeNumber = "TC123456",
                 EmiratesIdNumber = "EID987654321",
                 DriverName = "Jane Smith",
                 LicenseNumber = "LN987654",
                 DriverNationality = "British",
                 LicenseSource = "UK",
                 CertificateIssueDate = "2023-06-15",
                 CertificateReferenceNumber = "CERT123456"
             }
            );

            modelBuilder.Entity<User>().HasData(new User { Id = 1, Email = "ali@gmail.com", Password = "123", Role = "Admin" });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
    }
}
