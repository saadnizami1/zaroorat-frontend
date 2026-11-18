import { RiDoubleQuotesL } from "react-icons/ri";
import Reveal from "../Reveal";

// Summaries of real field-team cases (backups/team-cases-2026-11-18.json),
// written from what the volunteer saw on the visit — not quotes from the families.
const CASES = [
  {
    lang: "ur",
    text: "ملتان کے رکشہ ڈرائیور غلام رسول کے گردے ناکارہ ہو چکے ہیں۔ جنوری میں مفت علاج کی باری آنے تک انہیں ہر ہفتے ایک اضافی ڈائلیسس کی ضرورت ہے۔ ہماری رضاکار نے گھر جا کر ڈائلیسس کارڈ، ڈاکٹر کا نسخہ اور سینٹر کی رسیدیں خود دیکھیں۔",
    name: "Ghulam Rasool",
    city: "Multan",
  },
  {
    lang: "en",
    text: "Aiman, an orphan in Lahore, scored 1,010 in her matric exams and wants to become a doctor, but her board fee and MDCAT preparation are out of reach. Our volunteer saw her result card, college enrolment slip and the academy's fee letter at her home.",
    name: "Aiman",
    city: "Lahore",
  },
  {
    lang: "sd",
    text: "حيدرآباد جي 64 سالن جي زبيده جي ٻنهي اکين ۾ موتيو آهي ۽ هن جي نظر گهٽجي رهي آهي. هوءَ رليون سبي پنهنجي ٻن يتيم پوٽن جو پيٽ پالي ٿي، پر هاڻي ٽانڪا به نٿي ڏسي سگهي. اسان جي رضاڪار سندس گهر وڃي اکين جي ڊاڪٽر جي رپورٽ ۽ اسپتال جو خرچ پاڻ ڏٺو.",
    name: "Zubaida",
    city: "Hyderabad",
  },
  {
    lang: "ur",
    text: "گوجرانوالہ کی نصرت کے شوہر مارچ میں انتقال کر گئے۔ اب وہ اکیلے چار بچوں کو پال رہی ہیں اور اپنے پیروں پر کھڑے ہونے تک انہیں چھ ماہ کے بنیادی راشن کی ضرورت ہے۔ ہماری رضاکار نے ڈیتھ سرٹیفکیٹ اور کریانے کی دکان کا ادھار ریکارڈ خود دیکھا۔",
    name: "Nusrat",
    city: "Gujranwala",
  },
  {
    lang: "en",
    text: "The solar pump that gave water to 60 families in a village near Mithi has broken down, and women now walk for hours to a distant well. Our volunteer met the village elders, saw the broken pump and got a technician's written repair estimate.",
    name: "Village near Mithi",
    city: "Tharparkar",
  },
];

const Testimonials = () => {
  return (
    <section className="section testi-section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow center">From our field visits</span>
          <h2 className="section-title">Real cases, checked in person</h2>
        </Reveal>

        <div className="testi-grid">
          {CASES.map((c, i) => {
            const rtl = c.lang !== "en";
            return (
              <Reveal className="testi-card" key={c.name} delay={(i % 3) + 1}>
                <RiDoubleQuotesL className="testi-mark" />
                <p className={`testi-text${rtl ? ` testi-rtl testi-${c.lang}` : ""}`} lang={c.lang} dir={rtl ? "rtl" : "ltr"}>
                  {c.text}
                </p>
                <div className="testi-author">
                  <span className="testi-avatar">{c.name[0]}</span>
                  <span>
                    <strong>{c.name}</strong>
                    <span className="testi-city">{c.city}, Pakistan</span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
