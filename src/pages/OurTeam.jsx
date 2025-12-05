import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaEnvelope, FaInstagram, FaLinkedin, FaChevronDown, FaUsers, FaHeadset, FaBullhorn, FaLaptopCode } from "react-icons/fa";

const OurTeam = () => {
  const [expandedDepts, setExpandedDepts] = useState([]);

  const toggleDept = (dept) => {
    if (expandedDepts.includes(dept)) {
      setExpandedDepts(expandedDepts.filter(d => d !== dept));
    } else {
      setExpandedDepts([...expandedDepts, dept]);
    }
  };

  return (
    <>
      <style>{`
        .org-page {
          background: #f5f5f5;
          min-height: 100vh;
          padding: 120px 20px 80px;
        }

        .org-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .org-title {
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
          letter-spacing: 2px;
        }

        .org-subtitle {
          text-align: center;
          color: #7f8c8d;
          font-size: 16px;
          margin-bottom: 60px;
        }

        /* Founder Level */
        .founder-level {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .org-card {
          background: white;
          border-radius: 8px;
          padding: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          width: 280px;
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .org-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          transform: translateY(-4px);
        }

        .card-header {
          background: linear-gradient(135deg, #1FAF5B 0%, #0d7d3a 100%);
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: 700;
          color: #1FAF5B;
          border: 4px solid rgba(255,255,255,0.3);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .card-header h3 {
          color: white;
          font-size: 20px;
          margin: 0 0 5px 0;
          font-weight: 600;
        }

        .card-header p {
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          margin: 0;
        }

        .card-body {
          padding: 20px;
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-icon.email { background: #EA4335; }
        .social-icon.instagram { background: #E4405F; }
        .social-icon.linkedin { background: #0077B5; }

        .social-icon:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        /* Connector Lines */
        .connector-v {
          width: 2px;
          height: 60px;
          background: #bdc3c7;
          margin: 0 auto;
        }

        .connector-h-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          max-width: 900px;
        }

        .connector-h {
          height: 2px;
          background: #bdc3c7;
          flex: 1;
        }

        .connector-center {
          width: 20px;
          height: 20px;
          border: 2px solid #bdc3c7;
          border-radius: 50%;
          background: white;
        }

        /* Department Level */
        .dept-level {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          max-width: 1100px;
          margin: 40px auto 0;
          padding: 0 20px;
        }

        .dept-card {
          background: white;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .dept-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .dept-header {
          padding: 25px 20px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          border-bottom: 1px solid #e0e0e0;
        }

        .dept-header.support { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); }
        .dept-header.engage { background: linear-gradient(135deg, #1FAF5B 0%, #0d7d3a 100%); }
        .dept-header.webops { background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); }

        .dept-icon {
          font-size: 32px;
          color: white;
          margin-bottom: 12px;
        }

        .dept-header h4 {
          color: white;
          font-size: 18px;
          margin: 0 0 6px 0;
          font-weight: 600;
        }

        .dept-header p {
          color: rgba(255,255,255,0.9);
          font-size: 13px;
          margin: 0;
        }

        .expand-btn {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.2);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .expand-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .expand-btn.rotated {
          transform: translateY(-50%) rotate(180deg);
        }

        .members-list {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .members-list.open {
          max-height: 400px;
        }

        .member-item {
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          transition: background 0.2s ease;
        }

        .member-item:last-child {
          border-bottom: none;
        }

        .member-item:hover {
          background: #f8f9fa;
        }

        .member-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ecf0f1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #7f8c8d;
        }

        .member-name {
          font-size: 14px;
          color: #2c3e50;
          font-weight: 500;
        }

        /* Footer Text */
        .org-footer {
          text-align: center;
          margin-top: 80px;
          padding: 40px 20px;
          background: white;
          border-radius: 8px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .org-footer p {
          font-size: 18px;
          color: #34495e;
          line-height: 1.8;
          margin: 0;
        }

        .org-footer strong {
          color: #1FAF5B;
        }

        @media (max-width: 768px) {
          .dept-level {
            grid-template-columns: 1fr;
          }
          
          .org-title {
            font-size: 24px;
          }
        }
      `}</style>

      <Navbar />

      <div className="org-page">
        <div className="org-container">
          
          <h1 className="org-title">ORGANIZATIONAL CHART</h1>
          <p className="org-subtitle">Meet the team behind Zaroorat, Pakistan's first crowdfunding platform</p>

          {/* Founder */}
          <div className="founder-level">
            <div className="org-card">
              <div className="card-header">
                <div className="avatar-circle">SN</div>
                <h3>Saad Nizami</h3>
                <p>Founder</p>
              </div>
              <div className="card-body">
                <div className="social-links">
                  <a href="mailto:saadnizami114@gmail.com" className="social-icon email" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope />
                  </a>
                  <a href="https://www.instagram.com/saadnizami__/" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/in/saad-nizami-250ab0374/" className="social-icon linkedin" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="connector-v"></div>

          {/* Horizontal Line */}
          <div className="connector-h-container">
            <div className="connector-h"></div>
            <div className="connector-center"></div>
            <div className="connector-h"></div>
          </div>

          {/* Vertical Lines to Departments */}
          <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
            <div className="connector-v" style={{ height: '40px' }}></div>
            <div className="connector-v" style={{ height: '40px' }}></div>
            <div className="connector-v" style={{ height: '40px' }}></div>
          </div>

          {/* Departments */}
          <div className="dept-level">
            
            {/* Customer Support */}
            <div className="dept-card">
              <div className="dept-header support">
                <div className="dept-icon"><FaHeadset /></div>
                <h4>Customer Support</h4>
                <p>Head: Ahmad Adnan</p>
                <button 
                  className={`expand-btn ${expandedDepts.includes('support') ? 'rotated' : ''}`}
                  onClick={() => toggleDept('support')}
                >
                  <FaChevronDown />
                </button>
              </div>
              <div className={`members-list ${expandedDepts.includes('support') ? 'open' : ''}`}>
                <div className="member-item">
                  <div className="member-icon">UN</div>
                  <div className="member-name">Usman Nizai</div>
                </div>
                <div className="member-item">
                  <div className="member-icon">IK</div>
                  <div className="member-name">Irtaza Khan</div>
                </div>
                <div className="member-item">
                  <div className="member-icon">DZ</div>
                  <div className="member-name">Danyal Zaka</div>
                </div>
              </div>
            </div>

            {/* Public Engagement */}
            <div className="dept-card">
              <div className="dept-header engage">
                <div className="dept-icon"><FaBullhorn /></div>
                <h4>Public Engagement</h4>
                <p>Head: Hassan Ali</p>
                <button 
                  className={`expand-btn ${expandedDepts.includes('engage') ? 'rotated' : ''}`}
                  onClick={() => toggleDept('engage')}
                >
                  <FaChevronDown />
                </button>
              </div>
              <div className={`members-list ${expandedDepts.includes('engage') ? 'open' : ''}`}>
                <div className="member-item">
                  <div className="member-icon">MR</div>
                  <div className="member-name">Musa Raza</div>
                </div>
                <div className="member-item">
                  <div className="member-icon">AK</div>
                  <div className="member-name">Azan Khurram</div>
                </div>
                <div className="member-item">
                  <div className="member-icon">DN</div>
                  <div className="member-name">Danyyal Niazi</div>
                </div>
              </div>
            </div>

            {/* Web Operations */}
            <div className="dept-card">
              <div className="dept-header webops">
                <div className="dept-icon"><FaLaptopCode /></div>
                <h4>Web Operations</h4>
                <p>Head: Saad Nizami</p>
                <button 
                  className={`expand-btn ${expandedDepts.includes('webops') ? 'rotated' : ''}`}
                  onClick={() => toggleDept('webops')}
                >
                  <FaChevronDown />
                </button>
              </div>
              <div className={`members-list ${expandedDepts.includes('webops') ? 'open' : ''}`}>
                <div className="member-item">
                  <div className="member-icon">SF</div>
                  <div className="member-name">Salaar Farrukh</div>
                </div>
                <div className="member-item">
                  <div className="member-icon">IM</div>
                  <div className="member-name">Ibrahim Malik</div>
                </div>
              </div>
            </div>

          </div>

          {/* Mission Statement */}
          <div className="org-footer">
            <p>
              Together, we are building a platform that empowers Pakistan — <strong>one campaign at a time.</strong>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default OurTeam;
