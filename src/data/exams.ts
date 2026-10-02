// Exam-specific data for competitive exam typing tests

export interface Exam {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  description: string;
  requirements: {
    english: { speed: number; duration: number; unit: 'wpm' | 'cpm' };
    hindi?: { speed: number; duration: number; unit: 'wpm' | 'cpm' };
  };
  passages: {
    english: string[];
    hindi?: string[];
  };
  category: 'ssc' | 'railway' | 'state' | 'defense' | 'medical' | 'research';
}

export const exams: Exam[] = [
  {
    id: 'ssc-cgl',
    name: 'SSC CGL Typing Test',
    shortName: 'SSC CGL',
    logo: '🏛️',
    description: 'Staff Selection Commission - Combined Graduate Level',
    requirements: {
      english: { speed: 35, duration: 10, unit: 'wpm' },
      hindi: { speed: 30, duration: 10, unit: 'wpm' }
    },
    passages: {
      english: [
        "The Staff Selection Commission conducts various examinations for recruitment to Group B and Group C posts in various Ministries and Departments of the Government of India. The Combined Graduate Level Examination is one of the most prestigious exams conducted by SSC every year. Candidates who qualify the written examination are required to appear for the skill test which includes typing test.",
        "The typing test is conducted to assess the candidates proficiency in typing on computer. The candidates are required to type a passage on the computer within the stipulated time. The speed requirement varies for different posts. For general category candidates, the minimum speed required is thirty five words per minute in English.",
        "Government organizations play a vital role in the development of the country. They provide essential services to the citizens and ensure the implementation of various government schemes and policies. The employees working in these organizations are required to have good communication skills including typing skills."
      ],
      hindi: [
        "कार्मिक चयन आयोग विभिन्न मंत्रालयों और विभागों में ग्रुप बी और ग्रुप सी पदों पर भर्ती के लिए विभिन्न परीक्षाएं आयोजित करता है। संयुक्त स्नातक स्तरीय परीक्षा एसएससी द्वारा हर साल आयोजित की जाने वाली सबसे प्रतिष्ठित परीक्षाओं में से एक है।",
        "भारत सरकार के विभिन्न मंत्रालयों में कर्मचारियों की भर्ती के लिए टाइपिंग परीक्षा का आयोजन किया जाता है। इस परीक्षा में उम्मीदवारों को कंप्यूटर पर टाइपिंग करनी होती है। सामान्य श्रेणी के उम्मीदवारों के लिए न्यूनतम गति पैंतीस शब्द प्रति मिनट होनी चाहिए।"
      ]
    },
    category: 'ssc'
  },
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC Typing Test',
    shortName: 'RRB NTPC',
    logo: '🚂',
    description: 'Railway Recruitment Board - Non-Technical Popular Categories',
    requirements: {
      english: { speed: 30, duration: 10, unit: 'wpm' },
      hindi: { speed: 25, duration: 10, unit: 'wpm' }
    },
    passages: {
      english: [
        "The Indian Railways is one of the largest employers in the world, providing employment to millions of people. The Railway Recruitment Board conducts examinations for various non-technical popular categories posts. The selection process includes a computer-based aptitude test followed by a typing skill test.",
        "Railway stations are the lifeline of the Indian railway network. They serve as important hubs for passenger movement and freight transportation. The staff working at railway stations must be proficient in computer operations including typing to ensure smooth functioning of various administrative tasks.",
        "The modernization of Indian Railways has led to increased use of computers in various departments. From ticket reservation to freight management, computers have become an integral part of railway operations. Therefore, typing skills have become essential for railway employees."
      ],
      hindi: [
        "भारतीय रेल दुनिया के सबसे बड़े नियोक्ताओं में से एक है, जो लाखों लोगों को रोजगार प्रदान करती है। रेलवे भर्ती बोर्ड विभिन्न गैर-तकनीकी लोकप्रिय श्रेणी पदों के लिए परीक्षाएं आयोजित करता है।",
        "रेलवे स्टेशन भारतीय रेलवे नेटवर्क की जीवन रेखा हैं। वे यात्री आवागमन और माल ढुलाई के लिए महत्वपूर्ण केंद्र के रूप में कार्य करते हैं। रेलवे स्टेशनों पर काम करने वाले कर्मचारियों को विभिन्न प्रशासनिक कार्यों के सुचारू संचालन सुनिश्चित करने के लिए टाइपिंग सहित कंप्यूटर संचालन में कुशल होना चाहिए।"
      ]
    },
    category: 'railway'
  },
  {
    id: 'dsssb-jsa',
    name: 'DSSSB JSA Typing Test',
    shortName: 'DSSSB JSA',
    logo: '🏢',
    description: 'Delhi Subordinate Services Selection Board - Junior Secretariat Assistant',
    requirements: {
      english: { speed: 35, duration: 10, unit: 'wpm' },
      hindi: { speed: 30, duration: 10, unit: 'wpm' }
    },
    passages: {
      english: [
        "The Delhi Subordinate Services Selection Board is responsible for recruitment to various Group B and Group C posts under the Government of National Capital Territory of Delhi. The Junior Secretariat Assistant post requires candidates to have good typing skills as they will be handling secretarial work.",
        "Government offices in Delhi handle a large volume of correspondence and documentation daily. The staff must be able to type accurately and quickly to ensure timely processing of files and documents. The typing test is conducted to assess the candidates ability to type on computer keyboard.",
        "The Delhi government has been focusing on e-governance to improve service delivery to citizens. This has increased the demand for computer-literate staff who can handle digital documentation efficiently. Typing skills are therefore essential for government employees in Delhi."
      ],
      hindi: [
        "दिल्ली अधीनस्थ सेवा चयन बोर्ड राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार के अंतर्गत विभिन्न ग्रुप बी और ग्रुप सी पदों पर भर्ती के लिए जिम्मेदार है। जूनियर सचिवालय सहायक पद के लिए उम्मीदवारों में अच्छी टाइपिंग कौशल होना आवश्यक है।",
        "दिल्ली में सरकारी कार्यालय प्रतिदिन पत्राचार और दस्तावेजों की बड़ी मात्रा को संभालते हैं। कर्मचारियों को फाइलों और दस्तावेजों की समय पर प्रक्रिया सुनिश्चित करने के लिए सटीक और तेजी से टाइप करने में सक्षम होना चाहिए।"
      ]
    },
    category: 'state'
  },
  {
    id: 'aiims-cre',
    name: 'AIIMS CRE Typing Test',
    shortName: 'AIIMS CRE',
    logo: '🏥',
    description: 'All India Institute of Medical Sciences - Common Recruitment Exam',
    requirements: {
      english: { speed: 35, duration: 10, unit: 'wpm' },
      hindi: { speed: 30, duration: 10, unit: 'wpm' }
    },
    passages: {
      english: [
        "The All India Institute of Medical Sciences is a premier medical institution in India. It conducts various examinations for recruitment to administrative and secretarial posts. The typing test is an essential part of the selection process for posts like LDC, UDC, and DEO.",
        "Medical institutions require efficient administrative staff to manage patient records, appointment schedules, and other documentation. The staff must be proficient in typing to ensure accurate and timely data entry. The typing test assesses candidates ability to type medical and administrative terminology.",
        "AIIMS has multiple campuses across India, each requiring skilled administrative personnel. The recruitment process includes a written examination followed by a skill test. The typing test evaluates candidates speed and accuracy in typing on computer."
      ],
      hindi: [
        "अखिल भारतीय आयुर्विज्ञान संस्थान भारत की एक प्रमुख चिकित्सा संस्था है। यह प्रशासनिक और सचिवालय पदों पर भर्ती के लिए विभिन्न परीक्षाएं आयोजित करता है। टाइपिंग परीक्षा एलडीसी, यूडीसी और डीईओ जैसे पदों के लिए चयन प्रक्रिया का एक अनिवार्य हिस्सा है।",
        "चिकित्सा संस्थानों को रोगी रिकॉर्ड, अपॉइंटमेंट शेड्यूल और अन्य दस्तावेजों को प्रबंधित करने के लिए कुशल प्रशासनिक कर्मचारियों की आवश्यकता होती है। सटीक और समय पर डेटा_entry_ सुनिश्चित करने के लिए कर्मचारियों को टाइपिंग में कुशल होना चाहिए।"
      ]
    },
    category: 'medical'
  },
  {
    id: 'delhi-police',
    name: 'Delhi Police HCM Typing Test',
    shortName: 'Delhi Police',
    logo: '👮',
    description: 'Delhi Police - Head Constable Ministerial',
    requirements: {
      english: { speed: 30, duration: 10, unit: 'wpm' },
      hindi: { speed: 25, duration: 10, unit: 'wpm' }
    },
    passages: {
      english: [
        "The Delhi Police is the law enforcement agency for the National Capital Territory of Delhi. It is one of the largest police forces in India. The recruitment process for Head Constable Ministerial includes a typing test to assess candidates computer proficiency.",
        "Police departments maintain extensive records of cases, FIRs, and other legal documents. The staff must be able to type accurately and quickly to ensure proper documentation. The typing test evaluates candidates ability to type legal and administrative terminology.",
        "Modern policing requires extensive use of computers for crime reporting, investigation, and record keeping. Police personnel must be computer literate and proficient in typing. The typing test is conducted to ensure that candidates can handle computer-based work efficiently."
      ],
      hindi: [
        "दिल्ली पुलिस राष्ट्रीय राजधानी क्षेत्र दिल्ली के लिए कानून प्रवर्तन एजेंसी है। यह भारत की सबसे बड़ी पुलिस बलों में से एक है। हेड कांस्टेबल मिनिस्टीरियल के लिए भर्ती प्रक्रिया में उम्मीदवारों की कंप्यूटर दक्षता का आकलन करने के लिए टाइपिंग परीक्षा शामिल है।",
        "पुलिस विभाग मामलों, एफआईआर और अन्य कानूनी दस्तावेजों के व्यापक रिकॉर्ड बनाए रखते हैं। उचित दस्तावेजीकरण सुनिश्चित करने के लिए कर्मचारियों को सटीक और तेजी से टाइप करने में सक्षम होना चाहिए।"
      ]
    },
    category: 'defense'
  },
  {
    id: 'csir-jsa',
    name: 'CSIR JSA Typing Test',
    shortName: 'CSIR JSA',
    logo: '🔬',
    description: 'Council of Scientific and Industrial Research - Junior Secretariat Assistant',
    requirements: {
      english: { speed: 35, duration: 15, unit: 'cpm' },
      hindi: { speed: 30, duration: 15, unit: 'cpm' }
    },
    passages: {
      english: [
        "The Council of Scientific and Industrial Research is Indias largest research and development organization. It conducts various examinations for recruitment to administrative posts. The Junior Secretariat Assistant post requires candidates to have good typing skills.",
        "Research organizations require efficient administrative support to manage research projects, publications, and correspondence. The staff must be proficient in typing to ensure accurate documentation. The typing test assesses candidates ability to type scientific and administrative content.",
        "CSIR laboratories across India conduct cutting-edge research in various fields of science and technology. The administrative staff plays a crucial role in supporting research activities. Good typing skills are essential for handling documentation and correspondence."
      ],
      hindi: [
        "वैज्ञानिक और औद्योगिक अनुसंधान परिषद भारत का सबसे बड़ा अनुसंधान और विकास संगठन है। यह प्रशासनिक पदों पर भर्ती के लिए विभिन्न परीक्षाएं आयोजित करता है। जूनियर सचिवालय सहायक पद के लिए उम्मीदवारों में अच्छी टाइपिंग कौशल होना आवश्यक है।",
        "अनुसंधान संगठनों को अनुसंधान परियोजनाओं, प्रकाशनों और पत्राचार का प्रबंधन करने के लिए कुशल प्रशासनिक सहायता की आवश्यकता होती है। सटीक दस्तावेजीकरण सुनिश्चित करने के लिए कर्मचारियों को टाइपिंग में कुशल होना चाहिए।"
      ]
    },
    category: 'research'
  },
  {
    id: 'upsssc-ja',
    name: 'UPSSSC Junior Assistant Typing',
    shortName: 'UPSSSC JA',
    logo: '🏛️',
    description: 'Uttar Pradesh Subordinate Services Selection Commission - Junior Assistant',
    requirements: {
      english: { speed: 30, duration: 10, unit: 'wpm' },
      hindi: { speed: 25, duration: 10, unit: 'wpm' }
    },
    passages: {
      english: [
        "The Uttar Pradesh Subordinate Services Selection Commission conducts examinations for various posts under the Government of Uttar Pradesh. The Junior Assistant post requires candidates to have good typing skills as they will be handling administrative work.",
        "Government offices in Uttar Pradesh handle a large volume of files and documents daily. The staff must be able to type accurately and quickly to ensure timely processing. The typing test is conducted to assess candidates computer proficiency.",
        "The Uttar Pradesh government has been implementing various e-governance initiatives to improve service delivery. This has increased the demand for computer-literate staff. Typing skills are essential for government employees to handle digital documentation."
      ],
      hindi: [
        "उत्तर प्रदेश अधीनस्थ सेवा चयन आयोग उत्तर प्रदेश सरकार के अंतर्गत विभिन्न पदों के लिए परीक्षाएं आयोजित करता है। जूनियर असिस्टेंट पद के लिए उम्मीदवारों में अच्छी टाइपिंग कौशल होना आवश्यक है क्योंकि वे प्रशासनिक कार्य संभालेंगे।",
        "उत्तर प्रदेश में सरकारी कार्यालय प्रतिदिन फाइलों और दस्तावेजों की बड़ी मात्रा को संभालते हैं। समय पर प्रक्रिया सुनिश्चित करने के लिए कर्मचारियों को सटीक और तेजी से टाइप करने में सक्षम होना चाहिए।"
      ]
    },
    category: 'state'
  },
  {
    id: 'bsf-hcm',
    name: 'BSF HCM Typing Test',
    shortName: 'BSF HCM',
    logo: '🛡️',
    description: 'Border Security Force - Head Constable Ministerial',
    requirements: {
      english: { speed: 30, duration: 10, unit: 'wpm' },
      hindi: { speed: 25, duration: 10, unit: 'wpm' }
    },
    passages: {
      english: [
        "The Border Security Force is the primary border defense organization of India. It is responsible for guarding Indias borders during peacetime. The recruitment process for Head Constable Ministerial includes a typing test.",
        "BSF maintains extensive records related to border security, personnel management, and administrative matters. The staff must be proficient in typing to ensure accurate documentation. The typing test evaluates candidates computer skills.",
        "Modern border security operations require extensive use of computers for reporting, communication, and record keeping. BSF personnel must be computer literate. The typing test ensures candidates can handle computer-based administrative work."
      ],
      hindi: [
        "सीमा सुरक्षा बल भारत का प्राथमिक सीमा रक्षा संगठन है। यह शांति के समय भारत की सीमाओं की रक्षा के लिए जिम्मेदार है। हेड कांस्टेबल मिनिस्टीरियल के लिए भर्ती प्रक्रिया में टाइपिंग परीक्षा शामिल है।",
        "बीएसएफ सीमा सुरक्षा, कार्मिक प्रबंधन और प्रशासनिक मामलों से संबंधित व्यापक रिकॉर्ड बनाए रखता है। सटीक दस्तावेजीकरण सुनिश्चित करने के लिए कर्मचारियों को टाइपिंग में कुशल होना चाहिए।"
      ]
    },
    category: 'defense'
  }
];

export function getExamById(id: string): Exam | undefined {
  return exams.find(exam => exam.id === id);
}

export function getExamsByCategory(category: Exam['category']): Exam[] {
  return exams.filter(exam => exam.category === category);
}

export function getRandomPassageForExam(examId: string, language: 'english' | 'hindi' = 'english'): string {
  const exam = getExamById(examId);
  if (!exam) return '';
  
  const passages = language === 'hindi' && exam.passages.hindi 
    ? exam.passages.hindi 
    : exam.passages.english;
  
  const index = Math.floor(Math.random() * passages.length);
  return passages[index];
}

export function getMultiplePassagesForExam(examId: string, count: number, language: 'english' | 'hindi' = 'english'): string {
  const exam = getExamById(examId);
  if (!exam) return '';
  
  const passages = language === 'hindi' && exam.passages.hindi 
    ? exam.passages.hindi 
    : exam.passages.english;
  
  const shuffled = [...passages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, passages.length)).join('\n\n');
}
