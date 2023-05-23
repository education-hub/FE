<h1>Welcome to Education Hub,<br> “find your dream school” </h1>

![GitHub commit activity](https://storage.googleapis.com/prj1ropel/eduhub-logo-black.png)

## 📑 ABOUT PROJECT

reach your dream school through your hands without having to go anywhere. Find more details about the school

1. Who are the costumer
   - Administrators who want to promote their school
   - Students who want to find a school
2. What do they suffer from?
   - Promote school
   - Looking for school
3. How do I answer their need?
   - Provides a platform that can make it easier for students to find schools

## DOCUMENTATION

#### ⚙ FE

- 🌐 Deployment : [Vercel](https://education-hub-fe-3q5c.vercel.app/)
- 🖼 Prototype : [FIGMA](https://www.figma.com/file/V47nbMoEvvmwWiyRwqDxj3/Untitled?type=design&node-id=152-411&t=VbOLRLvtEmaO0hg7-0)

#### ⚙ BE

- [SWAGGER](https://app.swaggerhub.com/apis/ropel12/Api-Documentation/1.0.0)

## 🤝 Collaboration

- [GitHub Repository for FrontEnd](https://github.com/education-hub/FE.git)
- [GitHub Repository for BackEnd](https://github.com/education-hub/BE.git)

## 🔮 FEATURES

- Auth (Register & Login)
- Role (Administrator or Student)
- Forget Password

#### :office_worker: As Administrator

- CRUD Profile
- CRUD School
  - Detail School
    - NPSN
    - Name
    - Adress
    - Quantity (Student, Teachers, Staff)
    - Accreditation
    - Image
    - Link Youtube Url Embedded
    - Pdf
  - Create Google Meet
  - CRUD Extracurricular
  - CRUD Achievement
  - CRUD default FAQ
  - CRUD Quiz
- Detail Student Admission
- Update Student Admission progress


#### :technologist: As Student

- CRUD Profile
- Searching School
- Look at Detail School
  - NPSN
  - Name
  - Adress
  - Quantity (Student, Teachers, Staff)
  - Accreditation
  - Image
  - Video
  - Pdf
  - Gmeet date
  - Extracurriculars
  - Achievements
- Add Review to School
- Registration to School
  - Form Registration
  - Quiz
  - Payment

## 🧰 Installation

Clone this project


```sh
git clone https://github.com/education-hub/FE.git
cd fe
```

#### ⌛ Install

```sh
npm install
```

#### 🚀 Usage

```sh
npm run dev
```

## 🛠️ Built With

- [Vite](https://vitejs.dev/)
- [TypeScripct](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Pdf Viewer](https://react-pdf-viewer.dev/)
- [React Pdf Renderer](https://react-pdf.org/)
- [Axios](https://axios-http.com/)
- [React](https://react.dev/)
- [React Cookie](https://www.npmjs.com/package/react-cookie)
- [React Dom](https://www.npmjs.com/package/react-dom)
- [React Router Dom](https://reactrouter.com/en/main)
- [Sweetalert2](https://www.npmjs.com/package/sweetalert2)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Validation Zod](https://zod.dev/)

## 📁 Folder Structure

```sh
fe
├─ public
├─ src
│  ├─ assets
│  ├─ components
│  │  ├─ Accordion.tsx
│  │  ├─ AccordionStudent.tsx
│  │  ├─ Button.tsx
│  │  ├─ Card.tsx
│  │  ├─ ComboBox.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Input.tsx
│  │  ├─ Layout.tsx
│  │  ├─ Navbar.tsx
│  │  └─ videoBackground.tsx
│  ├─ pages
│  │  ├─ Admin
│  │  │  ├─ AddSchool.tsx
│  │  │  ├─ Admission.tsx
│  │  │  ├─ DetailAdmission.tsx
│  │  │  ├─ EditSchool.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ padfDetailAdmission.tsx
│  │  │  ├─ Profile.tsx
│  │  │  ├─ TestResult.tsx
│  │  │  └─ UpdateProgress.tsx
│  │  ├─ Auth
│  │  │  ├─ ForgetPassword.tsx
│  │  │  ├─ Login.tsx
│  │  │  ├─ NewPassword.tsx
│  │  │  └─ Register.tsx
│  │  ├─ Student
│  │  │  ├─ DetailSchool.tsx
│  │  │  ├─ FirstRegistration.tsx
│  │  │  ├─ HerRegistration.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ Profile.tsx
│  │  │  ├─ Progress.tsx
│  │  │  ├─ RegisterSchool.tsx
│  │  │  ├─ RegisterForm.tsx
│  │  │  └─ Transaction.tsx
│  │  └─ index.tsx
│  ├─ routes
│  │  └─ index.tsx
│  ├─ styles
│  │  └─ index.tsx
│  ├─ utils
│  │  └─ user.tsx
│  └─ main.tsx
│  └─ vite-env.d.ts
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.json
├─ README.md
├─ tailwind.config.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts

```

<!-- CONTACT -->

## 🤖 BEST TEAM

#### BE

- Satrio Wibowo : [Github](https://github.com/orgs/education-hub/people/ropel12)

#### FE

- Irwan Hadi : [Github](https://github.com/orgs/education-hub/people/IrwanFicoFar)

- Yusuf Ashidicki Pradana : [Github](https://github.com/orgs/education-hub/people/ysfashidicki)
