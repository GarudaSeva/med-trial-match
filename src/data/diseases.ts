export interface Disease {
  id: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  homeRemedies: string[];
  whenToConsult: string;
  icon: string;
}

export const diseases: Disease[] = [
  {
    id: 'anemia',
    name: 'Anemia',
    category: 'Blood Disorders',
    description: 'Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues. Having anemia can make you feel tired and weak.',
    symptoms: [
      'Fatigue and weakness',
      'Pale or yellowish skin',
      'Irregular heartbeats',
      'Shortness of breath',
      'Dizziness or lightheadedness',
      'Cold hands and feet',
      'Headaches',
      'Chest pain'
    ],
    causes: [
      'Iron deficiency',
      'Vitamin B12 deficiency',
      'Chronic diseases (kidney disease, cancer)',
      'Inherited conditions (sickle cell anemia)',
      'Blood loss from injury or surgery',
      'Bone marrow problems'
    ],
    riskFactors: [
      'Poor diet lacking iron, vitamins',
      'Intestinal disorders affecting nutrient absorption',
      'Menstruation (in women)',
      'Pregnancy',
      'Chronic conditions',
      'Family history of inherited anemia'
    ],
    homeRemedies: [
      'Eat iron-rich foods (spinach, red meat, beans)',
      'Include vitamin C to improve iron absorption',
      'Take vitamin B12 supplements if deficient',
      'Consume beetroot juice regularly',
      'Add blackstrap molasses to diet',
      'Include dried fruits like dates and raisins'
    ],
    whenToConsult: 'Consult a doctor if you experience persistent fatigue, shortness of breath, or pale skin. Seek immediate care if you have chest pain or rapid heartbeat.',
    icon: 'droplet'
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    category: 'Cardiovascular',
    description: 'Hypertension, or high blood pressure, is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease.',
    symptoms: [
      'Often no symptoms (silent killer)',
      'Severe headaches',
      'Nosebleeds',
      'Fatigue or confusion',
      'Vision problems',
      'Chest pain',
      'Difficulty breathing',
      'Irregular heartbeat'
    ],
    causes: [
      'Unhealthy lifestyle habits',
      'Genetics and family history',
      'Chronic kidney disease',
      'Thyroid and adrenal disorders',
      'Sleep apnea',
      'Certain medications'
    ],
    riskFactors: [
      'Age (risk increases with age)',
      'Family history of high blood pressure',
      'Being overweight or obese',
      'Physical inactivity',
      'Tobacco use',
      'High sodium diet',
      'Excessive alcohol consumption',
      'Stress'
    ],
    homeRemedies: [
      'Reduce sodium intake',
      'Exercise regularly (30 minutes daily)',
      'Maintain a healthy weight',
      'Limit alcohol consumption',
      'Eat potassium-rich foods (bananas, sweet potatoes)',
      'Practice stress-reduction techniques',
      'Monitor blood pressure at home'
    ],
    whenToConsult: 'Consult a doctor if your blood pressure readings are consistently above 140/90 mmHg. Seek emergency care for readings above 180/120 mmHg with symptoms.',
    icon: 'heart'
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    category: 'Metabolic',
    description: 'Diabetes mellitus refers to a group of diseases that affect how your body uses blood sugar (glucose). Glucose is vital to your health because it\'s an important source of energy for the cells that make up your muscles and tissues.',
    symptoms: [
      'Increased thirst and urination',
      'Unexplained weight loss',
      'Extreme hunger',
      'Blurred vision',
      'Slow-healing sores',
      'Frequent infections',
      'Fatigue and irritability',
      'Tingling in hands or feet'
    ],
    causes: [
      'Type 1: Immune system attacks insulin-producing cells',
      'Type 2: Cells become resistant to insulin',
      'Gestational: Hormonal changes during pregnancy',
      'Genetic factors',
      'Environmental triggers'
    ],
    riskFactors: [
      'Family history of diabetes',
      'Overweight or obesity',
      'Physical inactivity',
      'Age (over 45)',
      'High blood pressure',
      'Abnormal cholesterol levels',
      'History of gestational diabetes',
      'Polycystic ovary syndrome'
    ],
    homeRemedies: [
      'Monitor carbohydrate intake',
      'Eat high-fiber foods',
      'Exercise regularly',
      'Stay hydrated with water',
      'Include cinnamon in diet',
      'Manage stress levels',
      'Get adequate sleep',
      'Regular blood sugar monitoring'
    ],
    whenToConsult: 'Consult a doctor if you experience symptoms of diabetes, especially increased thirst and urination. Regular screenings are important if you have risk factors.',
    icon: 'activity'
  },
  {
    id: 'asthma',
    name: 'Asthma',
    category: 'Respiratory',
    description: 'Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out, and shortness of breath.',
    symptoms: [
      'Shortness of breath',
      'Chest tightness or pain',
      'Wheezing when exhaling',
      'Trouble sleeping due to breathing',
      'Coughing or wheezing attacks',
      'Respiratory infections worsen symptoms'
    ],
    causes: [
      'Airborne allergens (pollen, dust mites, mold)',
      'Respiratory infections',
      'Physical activity',
      'Cold air',
      'Air pollutants and irritants',
      'Certain medications',
      'Strong emotions and stress',
      'Gastroesophageal reflux disease (GERD)'
    ],
    riskFactors: [
      'Family history of asthma',
      'Having allergic conditions',
      'Being overweight',
      'Smoking or exposure to secondhand smoke',
      'Exposure to exhaust fumes or pollution',
      'Occupational triggers (chemicals, dust)',
      'Childhood respiratory infections'
    ],
    homeRemedies: [
      'Identify and avoid triggers',
      'Use air purifiers at home',
      'Practice breathing exercises',
      'Stay hydrated',
      'Use steam inhalation',
      'Consume ginger and turmeric',
      'Maintain healthy weight',
      'Keep home clean and dust-free'
    ],
    whenToConsult: 'Consult a doctor if you have frequent asthma symptoms or need to use your quick-relief inhaler more often. Seek emergency care for severe breathing difficulty.',
    icon: 'wind'
  },
  {
    id: 'heart-disease',
    name: 'Heart Disease',
    category: 'Cardiovascular',
    description: 'Heart disease describes a range of conditions that affect your heart. These include coronary artery disease, heart rhythm problems (arrhythmias), and congenital heart defects, among others.',
    symptoms: [
      'Chest pain or discomfort (angina)',
      'Shortness of breath',
      'Pain in neck, jaw, or throat',
      'Pain in upper abdomen or back',
      'Numbness or coldness in extremities',
      'Fluttering in chest',
      'Racing or slow heartbeat',
      'Lightheadedness or fainting'
    ],
    causes: [
      'Coronary artery disease',
      'High blood pressure',
      'Diabetes',
      'Smoking',
      'High cholesterol',
      'Obesity',
      'Family history',
      'Poor diet and lack of exercise'
    ],
    riskFactors: [
      'Age',
      'Sex (men at higher risk earlier)',
      'Family history',
      'Smoking',
      'Poor diet',
      'High blood pressure and cholesterol',
      'Diabetes',
      'Obesity and physical inactivity',
      'Stress',
      'Poor dental health'
    ],
    homeRemedies: [
      'Eat heart-healthy diet (Mediterranean diet)',
      'Exercise for 30 minutes daily',
      'Maintain healthy weight',
      'Quit smoking',
      'Limit alcohol intake',
      'Manage stress',
      'Get quality sleep',
      'Monitor blood pressure and cholesterol'
    ],
    whenToConsult: 'Consult a doctor for regular heart health checkups. Seek emergency care immediately for chest pain, severe shortness of breath, or fainting.',
    icon: 'heart-pulse'
  }
];
