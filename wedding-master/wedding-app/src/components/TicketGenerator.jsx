import React from 'react';
import './TicketGenerator.css';

export default function TicketGenerator({ rsvpData, activeTheme }) {
  const { name, attending, guests } = rsvpData;

  // Generate a mock seat number and code
  const seatCode = attending === 'yes' 
    ? `TABLE ${Math.floor(Math.random() * 8) + 1} — SEAT ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 4) + 1}`
    : 'N/A';
  
  const ticketId = `DC-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ticket-wrapper">
      <div className={`wedding-ticket ${activeTheme}`}>
        {/* Ticket Left/Main */}
        <div className="ticket-main">
          <div className="ticket-tag">ADMIT ONE</div>
          <h3 className="ticket-names">Dinusha &amp; Chamini</h3>
          <div className="ticket-divider" />
          
          <div className="ticket-info-grid">
            <div className="info-block">
              <span className="info-label">GUEST</span>
              <span className="info-value">{name}</span>
            </div>
            <div className="info-block">
              <span className="info-label">STATUS</span>
              <span className={`info-value status-${attending}`}>
                {attending === 'yes' ? 'CONFIRMED' : 'DECLINED'}
              </span>
            </div>
            <div className="info-block">
              <span className="info-label">GUEST COUNT</span>
              <span className="info-value">{attending === 'yes' ? guests : '0'}</span>
            </div>
            <div className="info-block">
              <span className="info-label">SEAT ASSIGNMENT</span>
              <span className="info-value">{seatCode}</span>
            </div>
          </div>
          
          <div className="ticket-date-venue">
            <span>SUNDAY, AUGUST 11, 2030</span>
            <span className="dot">•</span>
            <span>SENURI GRAND HOTEL</span>
          </div>
        </div>

        {/* Ticket Right/Stub */}
        <div className="ticket-stub">
          <div className="stub-qr">
            {/* Styled vector QR representation */}
            <div className="qr-box">
              <div className="qr-corner qr-tl" />
              <div className="qr-corner qr-tr" />
              <div className="qr-corner qr-bl" />
              <div className="qr-corner qr-br" />
              <div className="qr-dot" />
            </div>
          </div>
          <span className="stub-id">{ticketId}</span>
          <span className="stub-verified">VERIFIED PASS</span>
        </div>
      </div>

      <div className="ticket-actions">
        <button className="ticket-action-btn print-btn" onClick={handlePrint}>
          🖨️ Print / Save PDF
        </button>
      </div>
    </div>
  );
}
