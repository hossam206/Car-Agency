using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class createTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExportCountryTo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VehicleType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExportPlateNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegistrationPlateNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegistrationDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegistrationExpiryDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VehicleMake = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModelYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryOfOrigin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VehicleColor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChassisNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EngineNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberOfDoors = table.Column<int>(type: "int", nullable: false),
                    FuelType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberOfSeats = table.Column<int>(type: "int", nullable: false),
                    EmptyWeight = table.Column<int>(type: "int", nullable: false),
                    InsuranceCompany = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InsuranceType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InsurancePolicyNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InsuranceExpiryDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PassportNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrafficCodeNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmiratesIdNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DriverName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LicenseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DriverNationality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LicenseSource = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CertificateIssueDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CertificateReferenceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "Category", "CertificateIssueDate", "CertificateReferenceNumber", "ChassisNumber", "CountryOfOrigin", "DriverName", "DriverNationality", "EmiratesIdNumber", "EmptyWeight", "EngineNumber", "ExportCountryTo", "ExportPlateNumber", "FuelType", "InsuranceCompany", "InsuranceExpiryDate", "InsurancePolicyNumber", "InsuranceType", "LicenseNumber", "LicenseSource", "ModelYear", "Nationality", "NumberOfDoors", "NumberOfSeats", "OwnerName", "PassportNumber", "RegistrationDate", "RegistrationExpiryDate", "RegistrationPlateNumber", "TrafficCodeNumber", "VehicleColor", "VehicleMake", "VehicleType" },
                values: new object[,]
                {
                    { -2, "Private", "2024-02-01", "CERT987654", "CHS123456789", "Japan", "John Doe", "American", "EID123456789", 1500, "ENG987654321", "Yemen", "EXP12345", "Petrol", "AXA", "2025-06-30", "INS123456", "Comprehensive", "LN123456", "USA", "2023", "American", 4, 5, "John Doe", "P123456789", "2024-01-01", "2025-01-01", "ABC123", "TC987654", "White", "Toyota", "Sedan" },
                    { -1, "Private", "2023-06-15", "CERT123456", "CHS987654321", "USA", "Jane Smith", "British", "EID987654321", 2000, "ENG123456789", "Yemen", "EXP67890", "Diesel", "Allianz", "2024-12-31", "INS987654", "Third Party", "LN987654", "UK", "2022", "British", 5, 7, "Jane Smith", "P987654321", "2023-05-10", "2024-05-10", "XYZ789", "TC123456", "Black", "Ford", "SUV" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { 1, "ali@gmail.com", "123", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
