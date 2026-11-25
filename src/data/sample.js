/**
 * Preview-only content.
 *
 * This data exists to demonstrate layout, navigation and states. It is not an
 * AI diagnosis. Real detections will be written by the inference backend in a
 * later milestone and will replace these records.
 */

export const sampleScans = [
  {
    id: 'scan-001',
    crop: 'Tomato',
    disease: 'Early blight',
    slug: 'tomato-early-blight',
    confidence: 0.92,
    severity: 'Moderate',
    status: 'detected',
    date: '2026-11-24T09:32:00Z',
    tone: 'amber',
  },
  {
    id: 'scan-002',
    crop: 'Maize',
    disease: 'Common rust',
    slug: 'maize-common-rust',
    confidence: 0.87,
    severity: 'Mild',
    status: 'detected',
    date: '2026-11-22T16:10:00Z',
    tone: 'blue',
  },
  {
    id: 'scan-003',
    crop: 'Bell pepper',
    disease: 'No disease detected',
    slug: 'healthy-leaf',
    confidence: 0.96,
    severity: 'Healthy',
    status: 'healthy',
    date: '2026-11-20T07:45:00Z',
    tone: 'lime',
  },
  {
    id: 'scan-004',
    crop: 'Potato',
    disease: 'Late blight',
    slug: 'potato-late-blight',
    confidence: 0.89,
    severity: 'High',
    status: 'detected',
    date: '2026-11-18T14:05:00Z',
    tone: 'red',
  },
  {
    id: 'scan-005',
    crop: 'Apple',
    disease: 'Apple scab',
    slug: 'apple-scab',
    confidence: 0.84,
    severity: 'Moderate',
    status: 'detected',
    date: '2026-11-15T11:20:00Z',
    tone: 'amber',
  },
];

export const diseaseLibrary = {
  'tomato-early-blight': {
    cause: 'Alternaria solani',
    summary:
      'A common fungal disease that starts on older leaves as small dark spots with concentric rings, then spreads during warm, humid weather.',
    symptoms: [
      'Dark brown spots with target-like rings on lower leaves',
      'Yellowing around spots and premature leaf drop',
      'Sunken, leathery lesions on stems and fruit',
    ],
    treatment: [
      'Remove and destroy affected leaves; avoid working on wet plants',
      'Improve airflow by spacing plants and watering at the base',
      'Apply a labelled fungicide early, rotating active ingredients',
    ],
  },
  'maize-common-rust': {
    cause: 'Puccinia sorghi',
    summary:
      'A fungal rust recognised by small reddish-brown pustules on both leaf surfaces. Severe infections reduce photosynthesis.',
    symptoms: [
      'Reddish-brown powdery pustules scattered across leaves',
      'Yellowing and drying of heavily infected leaf tissue',
      'Reduced growth when infection appears early',
    ],
    treatment: [
      'Choose resistant hybrids for the next planting season',
      'Avoid dense planting and overhead irrigation',
      'Use a registered fungicide if pustules appear before tasselling',
    ],
  },
  'healthy-leaf': {
    cause: 'No pathogen indicated in this sample',
    summary:
      'The sample shows even colour and intact leaf structure. Continue routine scouting and good hygiene practices.',
    symptoms: [
      'Uniform green colour without spotting or distortion',
      'No visible lesions, pustules or mould',
      'Leaf edges and veins appear intact',
    ],
    treatment: [
      'Keep inspecting new growth twice a week',
      'Water early in the day and keep leaves dry overnight',
      'Quarantine new plants for a week before adding them',
    ],
  },
  'potato-late-blight': {
    cause: 'Phytophthora infestans',
    summary:
      'A fast-spreading oomycete disease favoured by cool, wet conditions. It can destroy foliage and tubers quickly.',
    symptoms: [
      'Water-soaked dark lesions with pale halos on leaves',
      'White mould on leaf undersides in humid weather',
      'Firm, brown-rot lesions on tubers',
    ],
    treatment: [
      'Remove and destroy infected plants immediately',
      'Avoid irrigation overhead and improve drainage',
      'Apply a protectant fungicide before symptoms appear in risk periods',
    ],
  },
  'apple-scab': {
    cause: 'Venturia inaequalis',
    summary:
      'A fungal disease causing olive-green spots that turn dark and velvety, mainly in cool, wet springs.',
    symptoms: [
      'Olive-green to black velvety leaf spots',
      'Distorted, curled leaves and premature defoliation',
      'Dark, scabby lesions on fruit',
    ],
    treatment: [
      'Rake and destroy fallen leaves over winter',
      'Prune to improve light penetration and airflow',
      'Apply a labelled fungicide from bud break through petal fall',
    ],
  },
};

export const plantTips = [
  {
    id: 'tip-water',
    icon: 'water',
    title: 'Water at the base',
    body: 'Keep foliage dry to reduce fungal pressure.',
    tone: 'blue',
  },
  {
    id: 'tip-inspect',
    icon: 'eye',
    title: 'Inspect twice weekly',
    body: 'Check leaf undersides and new growth early.',
    tone: 'lime',
  },
  {
    id: 'tip-airflow',
    icon: 'leaf',
    title: 'Give plants room',
    body: 'Good spacing improves airflow and lowers risk.',
    tone: 'amber',
  },
];

export function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getScanById(id) {
  return sampleScans.find((scan) => scan.id === id) ?? null;
}

export function getDiseaseForScan(scan) {
  if (!scan) return null;
  return diseaseLibrary[scan.slug] ?? null;
}
