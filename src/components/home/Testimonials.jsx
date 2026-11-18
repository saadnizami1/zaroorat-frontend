import { RiDoubleQuotesL } from "react-icons/ri";
import Reveal from "../Reveal";

// Testimonials from field-team cases, in the families' own words (confirmed by the owner).
const CASES = [
  {
    lang: "ur",
    text: "میں کچھ عرصے سے اپنے گردوں کے علاج کے لیے جدوجہد کر رہا ہوں۔ مجھے باقاعدگی سے ڈائلیسس کی ضرورت ہے، اور جنوری میں مفت علاج ملنے تک مجھے ہر ہفتے ایک اضافی سیشن کا انتظام کرنا پڑتا ہے۔ سارے اخراجات اٹھانا میرے لیے بہت مشکل ہو گیا ہے۔ آپ کی ٹیم کے ایک رکن میرے گھر آئے، میرے میڈیکل کاغذات دیکھے اور میری صورتحال کی تصدیق کی۔",
    name: "Ghulam Rasool",
    city: "Multan",
  },
  {
    lang: "en",
    text: "I scored 1,010 marks in my matric exams, and becoming a doctor has always been my dream. But being an orphan, I don't have anyone who can easily support my education. Even paying my board fees and preparing for MDCAT has become a challenge. Your team visited me and verified my academic records. I just don't want financial difficulties to stand between me and my dream.",
    name: "Aiman",
    city: "Lahore",
  },
  {
    lang: "ur",
    text: "میری عمر 64 سال ہے، اور دونوں آنکھوں میں موتیا ہونے کی وجہ سے میری نظر کمزور ہوتی جا رہی ہے۔ روزمرہ کے کام خود سنبھالنا میرے لیے دن بدن مشکل ہوتا جا رہا ہے۔ مجھے اپنے علاج کے خرچ میں مدد کی ضرورت ہے، کیونکہ میں یہ خود برداشت نہیں کر سکتی۔ آپ کے رضاکار میرے پاس آئے، میرے میڈیکل ریکارڈ دیکھے اور میری صورتحال کو سمجھا۔",
    name: "Zubaida",
    city: "Hyderabad",
  },
  {
    lang: "en",
    text: "Since my husband passed away in March, I have been looking after our four children alone. Managing the household has become very difficult, especially when it comes to putting food on the table. I need some support with groceries for the next six months so I can give my children some stability. Your volunteer visited our home and went through our situation and the necessary records.",
    name: "Nusrat",
    city: "Gujranwala",
  },
  {
    lang: "sd",
    text: "اسان جو پاڻيءَ وارو سولر پمپ ڳوٺ جي لڳ ڀڳ 60 خاندانن کي پاڻي ڏيندو هو، پر هاڻي اهو بند ٿي ويو آهي. هاڻي عورتن کي گهر لاءِ پاڻي آڻڻ لاءِ ڪلاڪن جا ڪلاڪ پنڌ ڪرڻو پوي ٿو. ان ڪري هتي سڀني جي روزاني زندگي تمام ڏکي ٿي وئي آهي. توهان جو رضاڪار اسان جي ڳوٺ جي وڏن سان مليو، ٽٽل پمپ ڏٺائين ۽ هڪ ٽيڪنيشن کان مرمت جو تخمينو ورتائين. اسان کي اميد آهي ته جلد ئي اسان جو پاڻي بحال ٿي ويندو.",
    name: "Village Near Mithi",
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
