import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  Clock,
  Navigation,
  Search,
  Building2
} from 'lucide-react';
const doctors = [
  {
    id: 1,
    name: 'Dr. Ankit Sharma',
    specialty: 'General Physician',
    hospital: 'City Care Hospital',
    address: 'Civil Lines, Rewa, Madhya Pradesh',
    distance: '1.2 km',
    experience: '12 years experience',
    phone: '+91 98765 43210',
    rating: '4.8',
availability: 'Available today'
  },
  {
    id: 2,
    name: 'Dr. Priya Verma',
    specialty: 'General Physician',
    hospital: 'Shree Hospital',
    address: 'University Road, Rewa, Madhya Pradesh',
    distance: '2.4 km',
    experience: '9 years experience',
    phone: '+91 98765 12345',
    rating: '4.6',
    availability: 'Available today'
  },
  {
    id: 3,
    name: 'Dr. Rahul Mishra',
    specialty: 'Internal Medicine',
    hospital: 'LifeCare Medical Centre',
    address: 'Sirmour Chowk, Rewa, Madhya Pradesh',
    distance: '3.1 km',
    experience: '15 years experience',
    phone: '+91 91234 56789',
    rating: '4.9',
    availability: 'Available today'
  },
  {
    id: 4,
    name: 'Dr. Neha Tiwari',
    specialty: 'General Physician',
    hospital: 'Aarogya Clinic',
    address: 'Nehru Nagar, Rewa, Madhya Pradesh',
    distance: '3.8 km',
    experience: '7 years experience',
    phone: '+91 99887 66554',
    rating: '4.5',
    availability: 'Available today'
  },
  {
    id: 5,
    name: 'Dr. Vivek Singh',
    specialty: 'Cardiology',
    hospital: 'Heart Care Centre',
    address: 'Pili Kothi Road, Rewa, Madhya Pradesh',
    distance: '4.2 km',
    experience: '14 years experience',
    phone: '+91 90123 45678',
    rating: '4.8',
    availability: 'Available today'
  },
  {
    id: 6,
    name: 'Dr. Sneha Gupta',
    specialty: 'Dermatology',
    hospital: 'Skin & Wellness Clinic',
    address: 'Shilpi Plaza, Rewa, Madhya Pradesh',
    distance: '4.7 km',
    experience: '8 years experience',
    phone: '+91 93456 78901',
    rating: '4.7',
    availability: 'Available today'
  },
  {
    id: 7,
    name: 'Dr. Amit Patel',
    specialty: 'ENT Specialist',
    hospital: 'Sanjeevani Hospital',
    address: 'Ratahara, Rewa, Madhya Pradesh',
    distance: '5.1 km',
    experience: '11 years experience',
    phone: '+91 94567 89012',
    rating: '4.6',
    availability: 'Available today'
  },
  {
    id: 8,
    name: 'Dr. Riya Joshi',
    specialty: 'Pediatrics',
    hospital: 'Mother & Child Care',
    address: 'Allahabad Road, Rewa, Madhya Pradesh',
    distance: '5.6 km',
    experience: '10 years experience',
    phone: '+91 95678 90123',
    rating: '4.7',
    availability: 'Available today'
  },
  {
  id: 9,
  name: 'Dr. Arjun Kapoor',
  specialty: 'Oncology',
  hospital: 'Cancer Care Centre',
  address: 'Civil Lines, Rewa, Madhya Pradesh',
  distance: '3.6 km',
  experience: '16 years experience',
  phone: '+91 90000 11111',
  rating: '4.8',
  availability: 'Available today'
},
{
  id: 10,
  name: 'Dr. Kavita Sharma',
  specialty: 'Gastroenterology',
  hospital: 'Digestive Care Hospital',
  address: 'University Road, Rewa, Madhya Pradesh',
  distance: '3.9 km',
  experience: '13 years experience',
  phone: '+91 90000 22222',
  rating: '4.7',
  availability: 'Available today'
},
{
  id: 11,
  name: 'Dr. Mohit Verma',
  specialty: 'Orthopedics',
  hospital: 'Bone & Joint Care',
  address: 'Sirmour Chowk, Rewa, Madhya Pradesh',
  distance: '4.1 km',
  experience: '12 years experience',
  phone: '+91 90000 33333',
  rating: '4.7',
  availability: 'Available today'
},
{
  id: 12,
  name: 'Dr. Nisha Patel',
  specialty: 'Neurology',
  hospital: 'Neuro Care Centre',
  address: 'Nehru Nagar, Rewa, Madhya Pradesh',
  distance: '4.5 km',
  experience: '14 years experience',
  phone: '+91 90000 44444',
  rating: '4.8',
  availability: 'Available today'
},
{
  id: 13,
  name: 'Dr. Rajesh Gupta',
  specialty: 'Urology',
  hospital: 'Urology Care Hospital',
  address: 'Ratahara, Rewa, Madhya Pradesh',
  distance: '4.8 km',
  experience: '11 years experience',
  phone: '+91 90000 55555',
  rating: '4.6',
  availability: 'Available tomorrow'
},
{
  id: 14,
  name: 'Dr. Pooja Singh',
  specialty: 'Ophthalmology',
  hospital: 'Vision Care Clinic',
  address: 'Shilpi Plaza, Rewa, Madhya Pradesh',
  distance: '5.0 km',
  experience: '9 years experience',
  phone: '+91 90000 66666',
  rating: '4.7',
  availability: 'Available today'
},
{
  id: 15,
  name: 'Dr. Rohan Jain',
  specialty: 'Dentistry',
  hospital: 'Smile Dental Care',
  address: 'Allahabad Road, Rewa, Madhya Pradesh',
  distance: '5.2 km',
  experience: '10 years experience',
  phone: '+91 90000 77777',
  rating: '4.8',
  availability: 'Available today'
},
{
  id: 16,
  name: 'Dr. Meera Joshi',
  specialty: 'Psychiatry',
  hospital: 'Mind Wellness Centre',
  address: 'Civil Lines, Rewa, Madhya Pradesh',
  distance: '5.4 km',
  experience: '12 years experience',
  phone: '+91 90000 88888',
  rating: '4.7',
  availability: 'Available today'
}
];

export default function Doctors() {
  const [search, setSearch] = React.useState('');
  const [recommendedSpecialty, setRecommendedSpecialty] = React.useState('');

  React.useEffect(() => {
  try {
    const saved = sessionStorage.getItem('doctorSahabLatestResult');

    if (saved) {
      const result = JSON.parse(saved);

      setRecommendedSpecialty(
        result.recommendedSpecialty || ''
      );
    }
  } catch {
    setRecommendedSpecialty('');
  }
}, []);

 const searchResults = doctors.filter((doctor) =>
  `${doctor.name} ${doctor.specialty} ${doctor.hospital}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

const filteredDoctors = recommendedSpecialty
  ? [
      ...searchResults.filter(
        doctor => doctor.specialty === recommendedSpecialty
      ),
      ...searchResults.filter(
        doctor => doctor.specialty !== recommendedSpecialty
      )
    ]
  : searchResults;
  

  return (
    <div className="doctors-page">

      <header className="doctors-header">
        <a href="#/chat" className="back-home">
          <ArrowLeft size={17} />
          Back to Health Check
        </a>

        <div className="doctors-title">
          <div className="doctors-icon">
            <Stethoscope size={25} />
          </div>

          <div>
            <div className="result-eyebrow">Healthcare Access</div>
            <h1>Find a Doctor</h1>
            <p>Connect with healthcare professionals near you.</p>
          </div>
        </div>
      </header>

      <main className="doctors-container">

        <section className="doctor-search-card">
          <div>
           <h2>
  {recommendedSpecialty
    ? `Doctors for ${recommendedSpecialty}`
    : 'Recommended healthcare professionals'}
</h2>

<p>
  {recommendedSpecialty
    ? 'Doctors are prioritized based on the healthcare concern you described.'
    : 'Choose a doctor based on specialty, availability and location.'}
</p>
          </div>

          <div className="doctor-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search doctor, specialty or hospital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <div className="doctor-location">
          <MapPin size={18} />
          <span>Showing healthcare options around Rewa</span>
        </div>

        <section className="doctor-grid">

          {filteredDoctors.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>
              {recommendedSpecialty === doctor.specialty && (
  <div className="recommended-doctor-badge">
    ✓ Recommended for your concern
  </div>
)}

              <div className="doctor-card-top">

                <div className="doctor-avatar">
                  <Stethoscope size={27} />
                </div>

                <div className="doctor-main">
                  <h3>{doctor.name}</h3>

                  <div className="doctor-specialty">
                    {doctor.specialty}
                  </div>

                  <div className="doctor-rating">
                    <Star size={15} fill="currentColor" />
                    <span>{doctor.rating}</span>
                    <span className="rating-text">Highly rated</span>
                  </div>
                </div>

              </div>

              <div className="doctor-info">

                <div className="doctor-info-row">
                  <Stethoscope size={17} />
                  <span>{doctor.experience}</span>
                </div>

                <div className="doctor-info-row">
                  <MapPin size={17} />
                  <span>{doctor.hospital}</span>
                </div>

                <div className="doctor-info-row">
                  <Navigation size={17} />
                  <span>{doctor.distance} away</span>
                </div>

                <div className="doctor-info-row">
                  <Clock size={17} />
                  <span className="availability">
                    {doctor.availability}
                  </span>
                </div>

              </div>

              <div className="doctor-address">
                {doctor.address}
              </div>

             <div className="doctor-actions">

  <a
    href={`#/hospital/${encodeURIComponent(doctor.hospital)}`}
    className="doctor-btn secondary"
  >
    <Building2 size={16} />
    Hospital
  </a>

  <a
    href={`tel:${doctor.phone}`}
    className="doctor-btn secondary"
  >
    <Phone size={16} />
    Call
  </a>

  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      doctor.address
    )}`}
    target="_blank"
    rel="noreferrer"
    className="doctor-btn primary"
  >
    <Navigation size={16} />
    Directions
  </a>

</div>
            </article>
          ))}

        </section>

        {filteredDoctors.length === 0 && (
          <div className="no-doctors">
            <Stethoscope size={35} />
            <h3>No doctors found</h3>
            <p>Try searching for another doctor or specialty.</p>
          </div>
        )}

        <div className="doctor-disclaimer">
          <strong>Important:</strong> Doctor recommendations shown here are
          for healthcare-access demonstration purposes. Always verify
          availability, credentials and consultation details before visiting.
          In an emergency, contact local emergency services immediately.
        </div>

      </main>
    </div>
  );
}