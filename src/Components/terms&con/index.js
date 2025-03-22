import React from 'react'

function TermsConditions() {
  return (
    <div className="container py-5">
    {/* Page Header */}
    <div className="row mb-4 text-center">
      <div className="col">
        <h2 className="fw-bold text-primary">Terms & Conditions</h2>
        <p className="text-muted">
          Please read the following terms and conditions carefully before using our services.
        </p>
      </div>
    </div>

    {/* Terms Sections */}
    <div className="row">
      <div className="col-md-10 col-lg-8 mx-auto">
        {/* General Information */}
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-body">
            <h5 className="fw-bold text-dark">1. General Information</h5>
            <p className="text-muted">
              Welcome to our pediatric clinic. By accessing our website, you agree to these terms.
            </p>
          </div>
        </div>

        {/* User Responsibilities */}
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-body">
            <h5 className="fw-bold text-dark">2. User Responsibilities</h5>
            <ul className="text-muted">
              <li>Users must provide accurate health details for better service.</li>
              <li>Appointments must be scheduled in advance.</li>
              <li>Misuse of the platform may result in restricted access.</li>
            </ul>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-body">
            <h5 className="fw-bold text-dark">3. Privacy Policy</h5>
            <p className="text-muted">
              We prioritize your privacy. Your data will be handled securely and will not be shared without consent.
            </p>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-body">
            <h5 className="fw-bold text-dark">4. Cancellation Policy</h5>
            <p className="text-muted">
              Users can cancel appointments at least 24 hours in advance. Late cancellations may be subject to fees.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-body">
            <h5 className="fw-bold text-dark">5. Disclaimer</h5>
            <p className="text-muted">
              Our services provide general healthcare guidance and should not be used as a substitute for emergency medical attention.
            </p>
          </div>
        </div>

        {/* Accept Button */}
       
      </div>
    </div>
  </div>
  )
}

export default TermsConditions
