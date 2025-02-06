using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class addExportCountryTo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ExportCountryTo",
                table: "Items",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "Category", "CertificateIssueDate", "CertificateReferenceNumber", "ChassisNumber", "CountryOfOrigin", "DriverName", "DriverNationality", "EmiratesIdNumber", "EmptyWeight", "EngineNumber", "ExportCountryTo", "ExportPlateNumber", "FuelType", "InsuranceCompany", "InsuranceExpiryDate", "InsurancePolicyNumber", "InsuranceType", "LicenseNumber", "LicenseSource", "ModelYear", "Nationality", "NumberOfDoors", "NumberOfSeats", "OwnerName", "PassportNumber", "RegistrationDate", "RegistrationExpiryDate", "RegistrationPlateNumber", "TrafficCodeNumber", "VehicleColor", "VehicleMake", "VehicleType" },
                values: new object[,]
                {
                    { -2, "Private", "2024-02-01", "CERT987654", "CHS123456789", "Japan", "John Doe", "American", "EID123456789", 1500, "ENG987654321", "Yemen", "EXP12345", "Petrol", "AXA", "2025-06-30", "INS123456", "Comprehensive", "LN123456", "USA", "2023", "American", 4, 5, "John Doe", "P123456789", "2024-01-01", "2025-01-01", "ABC123", "TC987654", "White", "Toyota", "Sedan" },
                    { -1, "Private", "2023-06-15", "CERT123456", "CHS987654321", "USA", "Jane Smith", "British", "EID987654321", 2000, "ENG123456789", "Yemen", "EXP67890", "Diesel", "Allianz", "2024-12-31", "INS987654", "Third Party", "LN987654", "UK", "2022", "British", 5, 7, "Jane Smith", "P987654321", "2023-05-10", "2024-05-10", "XYZ789", "TC123456", "Black", "Ford", "SUV" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "Id",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "Id",
                keyValue: -1);

            migrationBuilder.DropColumn(
                name: "ExportCountryTo",
                table: "Items");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "Category", "CertificateIssueDate", "CertificateReferenceNumber", "ChassisNumber", "CountryOfOrigin", "DriverName", "DriverNationality", "EmiratesIdNumber", "EmptyWeight", "EngineNumber", "ExportPlateNumber", "FuelType", "InsuranceCompany", "InsuranceExpiryDate", "InsurancePolicyNumber", "InsuranceType", "LicenseNumber", "LicenseSource", "ModelYear", "Nationality", "NumberOfDoors", "NumberOfSeats", "OwnerName", "PassportNumber", "RegistrationDate", "RegistrationExpiryDate", "RegistrationPlateNumber", "TrafficCodeNumber", "VehicleColor", "VehicleMake", "VehicleType" },
                values: new object[,]
                {
                    { 1, "Private", "2024-02-01", "CERT987654", "CHS123456789", "Japan", "John Doe", "American", "EID123456789", 1500, "ENG987654321", "EXP12345", "Petrol", "AXA", "2025-06-30", "INS123456", "Comprehensive", "LN123456", "USA", "2023", "American", 4, 5, "John Doe", "P123456789", "2024-01-01", "2025-01-01", "ABC123", "TC987654", "White", "Toyota", "Sedan" },
                    { 2, "Private", "2023-06-15", "CERT123456", "CHS987654321", "USA", "Jane Smith", "British", "EID987654321", 2000, "ENG123456789", "EXP67890", "Diesel", "Allianz", "2024-12-31", "INS987654", "Third Party", "LN987654", "UK", "2022", "British", 5, 7, "Jane Smith", "P987654321", "2023-05-10", "2024-05-10", "XYZ789", "TC123456", "Black", "Ford", "SUV" }
                });
        }
    }
}
