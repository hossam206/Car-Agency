using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{

    public class Car
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public int Id { get; set; }
        public string? ExportCountryTo { get; set; }
        public string? VehicleType { get; set; }
        public string? ExportPlateNumber { get; set; }
        public string? RegistrationPlateNumber { get; set; }
        public string? RegistrationDate { get; set; }
        public string? RegistrationExpiryDate { get; set; }
        public string? VehicleMake { get; set; }
        public string? Category { get; set; }
        public string? ModelYear { get; set; }
        public string? CountryOfOrigin { get; set; }
        public string? VehicleColor { get; set; }
        public string? ChassisNumber { get; set; }
        public string? EngineNumber { get; set; }
        public int? NumberOfDoors { get; set; }
        public string? FuelType { get; set; }
        public int? NumberOfSeats { get; set; }
        public int? EmptyWeight { get; set; }
        public string? InsuranceCompany { get; set; }
        public string? InsuranceType { get; set; }
        public string? InsurancePolicyNumber { get; set; }
        public string? InsuranceExpiryDate { get; set; }
        public string? OwnerName { get; set; }
        public string? Nationality { get; set; }
        public string? PassportNumber { get; set; }
        public string? TrafficCodeNumber { get; set; }
        public string? EmiratesIdNumber { get; set; }
        public string? DriverName { get; set; }
        public string? LicenseNumber { get; set; }
        public string? DriverNationality { get; set; }
        public string? LicenseSource { get; set; }
        public string? CertificateIssueDate { get; set; }
        public string? CertificateReferenceNumber { get; set; }
    }
}
