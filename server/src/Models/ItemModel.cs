using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Server.Models
{

    public class Item
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int Id { get; set; }
        [Required]
        public string VehicleType { get; set; }
        [Required]
        public string ExportPlateNumber { get; set; }
        [Required]
        public string RegistrationPlateNumber { get; set; }
        [Required]
        public string RegistrationDate { get; set; }
        [Required]
        public string RegistrationExpiryDate { get; set; }
        [Required]
        public string VehicleMake { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string ModelYear { get; set; }
        [Required]
        public string CountryOfOrigin { get; set; }
        [Required]
        public string VehicleColor { get; set; }
        [Required]
        public string ChassisNumber { get; set; }
        [Required]
        public string EngineNumber { get; set; }
        [Required]
        public int NumberOfDoors { get; set; }
        [Required]
        public string FuelType { get; set; }
        [Required]
        public int NumberOfSeats { get; set; }
        [Required]
        public int EmptyWeight { get; set; }
        [Required]
        public string InsuranceCompany { get; set; }
        [Required]
        public string InsuranceType { get; set; }
        [Required]
        public string InsurancePolicyNumber { get; set; }
        [Required]
        public string InsuranceExpiryDate { get; set; }
        [Required]
        public string OwnerName { get; set; }
        [Required]
        public string Nationality { get; set; }
        [Required]
        public string PassportNumber { get; set; }
        [Required]
        public string TrafficCodeNumber { get; set; }
        [Required]
        public string EmiratesIdNumber { get; set; }
        [Required]
        public string DriverName { get; set; }
        [Required]
        public string LicenseNumber { get; set; }
        [Required]
        public string DriverNationality { get; set; }
        [Required]
        public string LicenseSource { get; set; }
        [Required]
        public string CertificateIssueDate { get; set; }
        [Required]
        public string CertificateReferenceNumber { get; set; }
    }
}
