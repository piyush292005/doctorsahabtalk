import React from 'react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';

const hospitals = {
  'City Care Hospital': {
    address: 'Civil Lines, Rewa, Madhya Pradesh',
    phone: '+91 98765 43210',
    timing: 'Open 24 hours',
    services: [
      'General Medicine',
      'Emergency Care',
      'Laboratory Services',
      'Pharmacy',
      'Diagnostic Services'
    ]
  },
  'Shree Hospital': {
    address: 'University Road, Rewa, Madhya Pradesh',
    phone: '+91 98765 12345',
    timing: '8:00 AM – 10:00 PM',
    services: [
      'General Medicine',
      'Health Checkups',
      'Laboratory Services',
      'Pharmacy'
    ]
  },
  'LifeCare Medical Centre': {
    address: 'Sirmour Chowk, Rewa, Madhya Pradesh',
    phone: '+91 91234 56789',
    timing: '9:00 AM – 9:00 PM',
    services: [
      'Internal Medicine',
      'Diagnostics',
      'General Consultation',
      'Laboratory Services'
    ]
  }
};

export default function HospitalDetails() {
  const hospitalName =
    decodeURIComponent(
      window.location.hash.split('/hospital/')[1] || ''
    ) || 'City Care Hospital';

  const hospital =
    hospitals[hospitalName] || hospitals['City Care Hospital'];

  const mapUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      hospital.address
    )}`;

  return (
    <div className="hospital-page">

      <header className="hospital-header">
        <a href="#/doctors" className="back-home">
          <ArrowLeft size={17} />
          Back to Doctors
        </a>
      </header>

      <main className="hospital-container">

        <section className="hospital-hero">

          <div className="hospital-icon">
            <Building2 size={34} />
          </div>

          <div>
            <div className="result-eyebrow">
              Healthcare Facility
            </div>

            <h1>{hospitalName}</h1>

            <p>
              Healthcare facility information and access details
            </p>
          </div>

        </section>

        <section className="hospital-grid">

          <div className="hospital-main-card">

            <h2>Hospital information</h2>

            <div className="hospital-detail">
              <MapPin size={19} />
              <div>
                <strong>Address</strong>
                <span>{hospital.address}</span>
              </div>
            </div>

            <div className="hospital-detail">
              <Phone size={19} />
              <div>
                <strong>Contact</strong>
                <span>{hospital.phone}</span>
              </div>
            </div>

            <div className="hospital-detail">
              <Clock size={19} />
              <div>
                <strong>Timings</strong>
                <span>{hospital.timing}</span>
              </div>
            </div>

            <div className="hospital-detail">
              <Stethoscope size={19} />
              <div>
                <strong>Healthcare services</strong>

                <div className="service-list">
                  {hospital.services.map((service) => (
                    <span key={service}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hospital-actions">

              <a
                href={`tel:${hospital.phone}`}
                className="hospital-btn secondary"
              >
                <Phone size={17} />
                Call Hospital
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="hospital-btn primary"
              >
                <Navigation size={17} />
                Get Directions
              </a>

            </div>

          </div>

          <aside className="hospital-side-card">

            <div className="side-icon">
              <ShieldCheck size={23} />
            </div>

            <h3>Before you visit</h3>

            <ul>
              <li>Verify doctor availability before visiting.</li>
              <li>Confirm consultation timings.</li>
              <li>Carry relevant medical reports if available.</li>
              <li>For emergencies, seek immediate professional care.</li>
            </ul>

            <div className="hospital-note">
              Information shown in this prototype is for
              demonstration purposes.
            </div>

          </aside>

        </section>

      </main>
    </div>
  );
}