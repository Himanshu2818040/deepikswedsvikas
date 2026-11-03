// English / Hindi support for the wedding invitation.
// The page is written in English. When Hindi is chosen, every text node and a few
// attributes are swapped using the dictionary below (keys are the English text,
// whitespace-collapsed). window.T() translates strings built at run time.
(function () {
  'use strict';

  var HI = {
    // --- toolbar / envelope ---
    'Play Song': 'गीत चलाएँ',
    'Mute Song': 'गीत बंद करें',
    'Auspicious Wedding Invitation': 'शुभ विवाह निमंत्रण',
    'Deepika & Vikas': 'दीपिका और विकास',
    'A SPECIAL INVITATION FOR': 'आपके लिए विशेष निमंत्रण',
    'You': 'आदरणीय अतिथि',
    'Enter the Celebration': 'उत्सव में प्रवेश करें',
    'Friday, 20th November 2026 • Kaithal, Haryana': 'शुक्रवार, 20 नवंबर 2026 • कैथल, हरियाणा',

    // --- navigation ---
    'Auspicious Blessings': 'शुभ आशीर्वाद',
    'The Couple': 'वर-वधू',
    'Golden Moments': 'सुनहरे पल',
    'Venues': 'स्थान',
    'R.S.V.P. & Wishes': 'आर.एस.वी.पी. व शुभकामनाएँ',

    // --- hero ---
    '"May Lord Ganesha, of curved trunk and immense brilliance like a million suns, remove all obstacles from our journey forever."':
      '"हे वक्रतुण्ड, विशालकाय, करोड़ों सूर्यों के समान तेजस्वी गणेश जी! हमारे सभी कार्य सदा निर्विघ्न सम्पन्न करें।"',
    'Under the divine blessings of our ancestors': 'हमारे पूर्वजों के दिव्य आशीर्वाद से',
    'Smt. Premo Devi & Sh. Bhag Singh Saini': 'श्रीमती प्रेमो देवी एवं श्री भाग सिंह सैनी',
    'feel immense pleasure in requesting your esteemed presence and heartfelt blessings on the auspicious occasion of the Marriage of their Loving Granddaughter':
      'अपनी लाड़ली पौत्री के शुभ विवाह के पावन अवसर पर आपको सादर आमंत्रित करते हुए तथा आपकी गरिमामयी उपस्थिति व हार्दिक आशीर्वाद की कामना करते हुए हमें अत्यंत हर्ष हो रहा है।',

    // --- couple ---
    '"A Marriage... being two hearts as one and One soul from two"': '"विवाह... दो दिलों का एक हो जाना और दो रूहों का एक आत्मा बन जाना"',
    'Auspicious Bride': 'शुभ वधू',
    'Deepika': 'दीपिका',
    'D/o': 'सुपुत्री',
    'Smt. Anita Rani': 'श्रीमती अनीता रानी',
    'Sh. Krishan Kumar Saini': 'श्री कृष्ण कुमार सैनी',
    'Bishan Garh Colony, Kaithal': 'बिशनगढ़ कॉलोनी, कैथल',
    'weds': 'संग',
    'Auspicious Groom': 'शुभ वर',
    'Vikas': 'विकास',
    'S/o': 'सुपुत्र',
    'Smt. Seema Devi': 'श्रीमती सीमा देवी',
    'Sh. Dharambir Saini': 'श्री धर्मबीर सैनी',
    'Kaithal, Haryana': 'कैथल, हरियाणा',
    'With Love, Especially For': 'प्रेम सहित, विशेष रूप से',
    'Dear Guest': 'प्रिय अतिथि',
    'Countdown to the Auspicious Muhurat': 'शुभ मुहूर्त में शेष समय',
    'Days': 'दिन',
    'Hours': 'घंटे',
    'Mins': 'मिनट',
    'Secs': 'सेकंड',
    'Add to Google Calendar': 'गूगल कैलेंडर में जोड़ें',

    // --- program ---
    'Auspicious Program': 'शुभ कार्यक्रम',
    'Every ritual blessed with joy, music and sacred traditions': 'हर रस्म खुशियों, संगीत और पावन परंपराओं से सराबोर',
    'Day 1 • Auspicious Sangeet': 'दिन 1 • शुभ संगीत',
    'Thursday, 19th November 2026': 'गुरुवार, 19 नवंबर 2026',
    'Ladies Sangeet & Mehendi': 'महिला संगीत एवं मेहंदी',
    'An evening filled with traditional folk melodies, dance & festivities': 'पारंपरिक लोकगीतों, नृत्य और उत्सव से सजी एक शाम',
    '8:00 PM': 'रात 8:00 बजे',
    'Day 2 • The Wedding Day': 'दिन 2 • विवाह का दिन',
    'Friday, 20th November 2026': 'शुक्रवार, 20 नवंबर 2026',
    'Mandha Ceremony': 'मांढा रस्म',
    'Sacred pre-wedding blessing rites at residence': 'निवास पर विवाह-पूर्व पावन आशीर्वाद की रस्में',
    '10:00 AM': 'प्रातः 10:00 बजे',
    'Reception of Barat (बरात स्वागत)': 'बरात स्वागत',
    'Welcoming the groom with royal dhol, garlands & aarti': 'ढोल, फूलमालाओं और आरती के साथ दूल्हे का भव्य स्वागत',
    '11:00 AM': 'प्रातः 11:00 बजे',
    'Royal Wedding Lunch (भोज)': 'शाही विवाह भोज',
    'Grand traditional vegetarian feast celebrating the union': 'मिलन के उत्सव में भव्य पारंपरिक शाकाहारी भोज',
    '12:00 Noon': 'दोपहर 12:00 बजे',
    'Doli Ceremony (विदाई)': 'डोली (विदाई) रस्म',
    "Heartfelt farewell and blessings for the newlyweds' new journey": 'नवविवाहित जोड़े की नई यात्रा के लिए भावभीनी विदाई और आशीर्वाद',
    '5:00 PM': 'शाम 5:00 बजे',

    // --- venues ---
    'Auspicious Destinations': 'शुभ स्थल',
    'Venues & Directions': 'स्थान एवं मार्ग',
    'Main Wedding Celebrations': 'मुख्य विवाह समारोह',
    'Celebration Farm': 'सेलिब्रेशन फार्म',
    'Ambala Road, Kaithal, Haryana': 'अंबाला रोड, कैथल, हरियाणा',
    'Venue for Barat Reception, Wedding Lunch & Doli Ceremony': 'बरात स्वागत, विवाह भोज एवं डोली रस्म का स्थल',
    'Navigate on Google Maps': 'गूगल मैप्स पर देखें',
    'Family Residence': 'पारिवारिक निवास',
    'Saini Niwas': 'सैनी निवास',
    'Bishan Garh Colony, Near R.K.S.D. College, Kaithal': 'बिशनगढ़ कॉलोनी, आर.के.एस.डी. कॉलेज के पास, कैथल',
    'Residence for Ladies Sangeet & Pre-wedding Mandha rituals': 'महिला संगीत एवं विवाह-पूर्व मांढा रस्मों का निवास स्थल',

    // --- invitation from / RSVP contacts ---
    '"We eagerly hope to see you by our side on the special day"': '"हमें बेसब्री से आशा है कि इस खास दिन पर आप हमारे साथ होंगे"',
    'With Love: Srisha & Divisha': 'प्यार सहित: श्रीशा एवं दिविशा',
    'Invitation Extended From': 'निमंत्रणकर्ता',
    'Krishan Kumar Saini': 'कृष्ण कुमार सैनी',
    'Contact:': 'संपर्क:',
    'With Best Compliments From (W.B.C.F.)': 'सप्रेम शुभकामनाओं सहित (W.B.C.F.)',
    'All Kohar Family Relatives & Friends': 'समस्त कोहर परिवार, रिश्तेदार एवं मित्रगण',
    'R.S.V.P.': 'कृपया सूचित करें (R.S.V.P.)',
    'Sh. Shyam Lal': 'श्री श्याम लाल',
    'Sh. Harish Saini': 'श्री हरीश सैनी',
    'M/s. Shri Krishna Electric Engg. Works': 'मैसर्स श्री कृष्णा इलेक्ट्रिक इंजीनियरिंग वर्क्स',
    'Chandana Gate, Kaithal •': 'चंदाना गेट, कैथल •',
    'M/s. B2B Readymade Showroom': 'मैसर्स बी2बी रेडीमेड शोरूम',
    'Dhand Road, Kaithal': 'ढांड रोड, कैथल',

    // --- blessing card & form ---
    'Ashirwad': 'आशीर्वाद',
    'Give Your Special Blessing': 'अपना विशेष आशीर्वाद दें',
    'Your blessing is the most precious gift for Deepika & Vikas as they begin their new journey together.':
      'आपका आशीर्वाद दीपिका और विकास के लिए सबसे अनमोल उपहार है, जब वे अपने नए जीवन की यात्रा आरंभ कर रहे हैं।',
    '🌸 Send My Blessings 🌸': '🌸 आशीर्वाद भेजें 🌸',
    'For Deepika & Vikas': 'दीपिका और विकास के लिए',
    'Your Name': 'आपका नाम',
    'City / Place': 'शहर / स्थान',
    'Your Relation with the Couple': 'वर-वधू से आपका संबंध',
    'Family': 'परिवार',
    'Relative': 'रिश्तेदार',
    'Friend': 'मित्र',
    'Neighbour': 'पड़ोसी',
    'Colleague': 'सहकर्मी',
    'Well-wisher': 'शुभचिंतक',
    'Your Blessing for Deepika & Vikas': 'दीपिका और विकास के लिए आपका आशीर्वाद',
    'Need words? Tap one to begin:': 'शब्द नहीं सूझ रहे? शुरू करने के लिए एक चुनें:',
    '💛 Lifetime of love': '💛 जीवनभर का प्यार',
    '🪔 Health & prosperity': '🪔 स्वास्थ्य व समृद्धि',
    '🕉️ Divine blessings': '🕉️ दिव्य आशीर्वाद',
    '💞 Two hearts, one soul': '💞 दो दिल, एक जान',
    '🌸 Send Blessings 🌸': '🌸 आशीर्वाद भेजें 🌸',

    // --- footer ---
    'Deepika & Vikas Wedding Invitation': 'दीपिका और विकास — विवाह निमंत्रण',
    'Lovingly coded, with zero bugs and unlimited': 'प्यार से बनाया गया, शून्य बग्स और असीमित',
    'mithai': 'मिठाई',
    ", by the bride's proud brother": ', दुल्हन के गर्वित भाई द्वारा',
    'Himanshu Saini': 'हिमांशु सैनी',
    'Software Developer • Part-time Wedding Website Wizard • Full-time Bhai 💛': 'सॉफ्टवेयर डेवलपर • पार्ट-टाइम वेडिंग वेबसाइट जादूगर • फुल-टाइम भाई 💛',

    // --- attributes ---
    'Print / Save Card': 'प्रिंट / कार्ड सेव करें',
    'Lit diyas': 'प्रज्वलित दीपक',
    'Close': 'बंद करें',
    'Type your name': 'अपना नाम लिखें',
    'e.g. Ramesh Sharma': 'जैसे रमेश शर्मा',
    'e.g. Kaithal': 'जैसे कैथल',
    'May your married life be filled with happiness, health and infinite love...': 'आपका वैवाहिक जीवन खुशियों, स्वास्थ्य और अपार प्रेम से भरा रहे...',
    'May God bless you both with a lifetime of love, laughter and togetherness.': 'ईश्वर आप दोनों को जीवन भर के प्रेम, हँसी और साथ का आशीर्वाद दें।',
    'Wishing you endless happiness, good health and prosperity in your new journey.': 'आपकी नई यात्रा में अपार खुशियाँ, अच्छा स्वास्थ्य और समृद्धि मिले, यही शुभकामना।',
    'May Lord Ganesha remove every obstacle and Goddess Lakshmi fill your home with joy.': 'भगवान गणेश सभी विघ्न दूर करें और माँ लक्ष्मी आपके घर को खुशियों से भर दें।',
    'Two hearts, one soul. Congratulations Deepika and Vikas, may your bond grow stronger every day!': 'दो दिल, एक जान। दीपिका और विकास को हार्दिक बधाई, आपका बंधन हर दिन और मजबूत हो!',

    // --- strings built at run time ---
    'Song muted': 'गीत बंद किया गया',
    'Playing wedding song 🎵': 'विवाह गीत चल रहा है 🎵',
    'Could not play the song. Tap the music button to try again.': 'गीत नहीं चल सका। दोबारा प्रयास के लिए संगीत बटन दबाएँ।',
    'Welcome! May this celebration bring you joy. ✨': 'स्वागत है! यह उत्सव आपके जीवन में खुशियाँ लाए। ✨',
    'Welcome {name}! May this celebration bring you joy. ✨': 'स्वागत है {name}! यह उत्सव आपके जीवन में खुशियाँ लाए। ✨',
    'Calendar file downloaded. Open it to add the wedding to your calendar!': 'कैलेंडर फ़ाइल डाउनलोड हो गई। विवाह को अपने कैलेंडर में जोड़ने के लिए इसे खोलें!',
    'Could not save your RSVP. Please call the family to confirm.': 'आपका संदेश सहेजा नहीं जा सका। कृपया परिवार को फ़ोन करके बताएँ।',
    'Thank you, {name}! Your blessing has reached Deepika & Vikas with love. 🙏': 'धन्यवाद, {name}! आपका आशीर्वाद दीपिका और विकास तक प्रेम सहित पहुँच गया है। 🙏',
    'Deepika weds Vikas - Wedding': 'दीपिका और विकास का शुभ विवाह',
    'Wedding of Deepika (D/o Anita Rani & Krishan Kumar Saini) and Vikas (S/o Seema Devi & Dharambir Saini). Mandha (10 AM), Barat (11 AM), Lunch (12 Noon), Doli (5 PM).':
      'दीपिका (सुपुत्री अनीता रानी व कृष्ण कुमार सैनी) एवं विकास (सुपुत्र सीमा देवी व धर्मबीर सैनी) का शुभ विवाह। मांढा (प्रातः 10 बजे), बरात (प्रातः 11 बजे), भोज (दोपहर 12 बजे), डोली (शाम 5 बजे)।',
    'Celebration Farm, Ambala Road, Kaithal, Haryana': 'सेलिब्रेशन फार्म, अंबाला रोड, कैथल, हरियाणा',
    'Deepika weds Vikas tomorrow': 'कल दीपिका और विकास का विवाह है'
  };

  var ATTRS = ['placeholder', 'aria-label', 'title', 'data-text'];
  var SKIP = 'script, style, textarea, [data-no-i18n]';
  var lang = 'en';
  var originals = new WeakMap();

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function translateTextNodes() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (node.parentElement && node.parentElement.closest(SKIP)) return;
      var src = originals.has(node) ? originals.get(node) : node.nodeValue;
      var key = norm(src);
      if (!key) return;
      if (lang === 'hi' && Object.prototype.hasOwnProperty.call(HI, key)) {
        if (!originals.has(node)) originals.set(node, src);
        var lead = src.match(/^\s*/)[0];
        var trail = src.match(/\s*$/)[0];
        node.nodeValue = lead + HI[key] + trail;
      } else if (lang === 'en' && originals.has(node)) {
        node.nodeValue = originals.get(node);
      }
    });
  }

  function translateAttributes() {
    ATTRS.forEach(function (attr) {
      document.querySelectorAll('[' + attr + ']').forEach(function (el) {
        if (el.closest('[data-no-i18n]')) return;
        var store = 'data-en-' + attr;
        var en = el.hasAttribute(store) ? el.getAttribute(store) : el.getAttribute(attr);
        if (lang === 'hi' && Object.prototype.hasOwnProperty.call(HI, en)) {
          if (!el.hasAttribute(store)) el.setAttribute(store, en);
          el.setAttribute(attr, HI[en]);
        } else if (lang === 'en' && el.hasAttribute(store)) {
          el.setAttribute(attr, el.getAttribute(store));
        }
      });
    });
  }

  function setLanguage(next) {
    lang = next === 'hi' ? 'hi' : 'en';
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-hi', lang === 'hi');
    translateTextNodes();
    translateAttributes();
    var toggle = document.getElementById('lang-toggle-label');
    if (toggle) toggle.textContent = lang === 'hi' ? 'English' : 'हिन्दी';
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  // Translate a string built at run time; {name} style placeholders are filled from vars
  window.T = function (en, vars) {
    var out = lang === 'hi' && Object.prototype.hasOwnProperty.call(HI, en) ? HI[en] : en;
    if (vars) Object.keys(vars).forEach(function (k) { out = out.split('{' + k + '}').join(vars[k]); });
    return out;
  };
  window.getLang = function () { return lang; };
  window.setLanguage = setLanguage;

  function hideChooser() {
    var chooser = document.getElementById('lang-chooser');
    if (!chooser) return;
    chooser.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(function () { chooser.style.display = 'none'; }, 600);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var fromLink = null;
    try { fromLink = new URLSearchParams(window.location.search).get('lang'); } catch (e) {}
    fromLink = fromLink === 'hi' || fromLink === 'en' ? fromLink : null;

    document.querySelectorAll('[data-pick-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-pick-lang'));
        hideChooser();
      });
    });

    var toggleBtn = document.getElementById('toggle-lang-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', function () { setLanguage(lang === 'hi' ? 'en' : 'hi'); });

    if (fromLink) {
      // The link already says which language to use, so skip the chooser
      setLanguage(fromLink);
      var chooser = document.getElementById('lang-chooser');
      if (chooser) chooser.style.display = 'none';
    } else {
      document.body.style.overflow = 'hidden';
      var observer = new MutationObserver(function () {
        var c = document.getElementById('lang-chooser');
        if (c && c.style.display === 'none') { document.body.style.overflow = ''; observer.disconnect(); }
      });
      var c = document.getElementById('lang-chooser');
      if (c) observer.observe(c, { attributes: true, attributeFilter: ['style'] });
    }
  });
})();
