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
