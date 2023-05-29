export interface ProvinceDataType {
  id: number;
  nama: string;
}

export interface CitiesDataType {
  id: number;
  id_provinsi: string;
  name: string;
}

export interface DistrictDataType {
  id: number;
  id_provinsi: string;
  id_kota: string;
  name: string;
}

export interface SubDistrictDataType {
  id: number;
  id_provinsi: string;
  id_kota: string;
  name: string;
}

export interface SchoolDataType {
  accreditation: string;
  achievement: string | null; // belum ketahuan data aslinya jika ditambahkan
  city: string;
  description: string;
  detail: string;
  district: string;
  extracurriculars: string | null; // belum ketahuan data aslinya jika ditambahkan
  gmeet: string;
  gmeet_date: string;
  id: number;
  image: any;
  name: string;
  npsn: string;
  payment: {
    interval: string | null; // belum ketahuan data aslinya jika ditambahkan
    onetime: string | null; // belum ketahuan data aslinya jika ditambahkan
  };
  pdf: any;
  province: string;
  quizLinkPreview: string;
  quizLinkPub: string;
  reviews: string | null; // belum ketahuan data aslinya jika ditambahkan
  staff: string;
  students: string;
  teachers: string;
  video: string;
  village: string;
  web: string;
  zipCode: string;
}

export interface GmeetDataType {
  start_time: string;
  end_time: string;
  school_id: number;
}

export interface ExtracurricularDataType {
  school_id: number;
  image: any;
  title: string;
  description: string;
}

export interface UpdateExtracurricularDataType {
  id: number;
  image: any;
  name: string;
  description: string;
}

export interface AchievementDataType {
  school_id: number;
  image: any;
  title: string;
  description: string;
}

export interface UpdateAchievementDataType {
  id: number;
  image: any;
  name: string;
  description: string;
}

export interface FAQDataType {
  school_id: number;
  question: string;
  answer: string;
}

export interface FAQUpdateDataType {
  id: number;
  question: string;
  answer: string;
}

export interface AddCostDataType {
  school_id: number;
  description: string;
  price: number;
  image: any;
  interval: number;
}

export interface CostDataType {
  id: number;
  description: string;
  price: number;
  image: any;
  interval: string;
}

export interface QuizDataType {
  school_id: number;
  question?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  answer?: number;
}

export interface DetailSchoolDataType {
  WaLink: string;
  accreditation: string;
  achievements: string | null; // belum ketahuan data aslinya jika ditambahkan
  city: string;
  description: string;
  detail: string;
  district: string;
  extracurriculars: string | null; // belum ketahuan data aslinya jika ditambahkan
  gmeet: string;
  gmeet_date: string;
  id: number;
  image: any;
  name: string;
  npsn: string;
  payments: {
    interval: string | number | null; // belum ketahuan data aslinya jika ditambahkan
    onetime: string | number | null; // belum ketahuan data aslinya jika ditambahkan
  };
  pdf: any;
  phone: string;
  province: string;
  quizLinkPreview: string;
  quizLinkPub: string;
  reviews: string | null; // belum ketahuan data aslinya jika ditambahkan
  staff: string;
  students: string;
  teachers: string;
  video: string;
  village: string;
  web: string;
  zipcode: string;
  faqs: [
    {
      id: number;
      question: string;
      answer: string;
    }
  ];
}

export interface user {
  username: string;
  fname: string;
  sname: string;
  email: string;
  password: string;
  address: string;
  image: any;
}

export interface StudentType {
  submission_id: number;
  progress_id: number;
  progress_status: string;
  user_image: any;
  user_id: number;
  user_name: string;
}

export interface ResultDataType {
  email: string;
  result: string;
}

export interface StudentDataType {
  school_name: string;
  date_place: string;
  parent_data: {
    gender: string;
    name: string;
    job: string;
    phone: string;
    religion: string;
    address: {
      province: string;
      city: string;
      district: string;
      village: string;
      detail: string;
      zip_code: string;
    };
  };
  parent_signature: string;
  student_data: {
    gender: string;
    graduation_from: string;
    name: string;
    nisn: number;
    photo: string;
    place_date: string;
    religion: string;
    address: {
      province: string;
      city: string;
      district: string;
      village: string;
      detail: string;
      zip_code: string;
    };
  };
  student_signature: string;
}

export interface ImageType {
  photo: string;
  parent_signature: string;
  student_signature: string;
}
