import { FC } from "react";

import { Layout } from "../../components/Layout";
import BgLandingPage from "/carousel-1.jpg";
import ImageCard from "/public/course-2.jpg";
import Logo from "../../assets/eduhub-logo-black.png";

const Student: FC = () => {
  return (
    <Layout>
      <div className="bg-gray-100">
        <div
          className="h-screen bg-cover bg-center flex justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.6)),url(${BgLandingPage})`,
          }}
        >
          <div className="w-5/6 px-5 py-64">
            <img src={Logo} alt="logo" className="mb-8" />
            <h1 className="text-black text-4xl font-extrabold">
              Web platform for school review and education community
            </h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <button className="bg-@blue hover:bg-green-600 text-white py-2 px-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
            Search
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={ImageCard}
              alt="Card 1"
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">SMAN 1 Surabaya</div>
              <div className="flex items-center">
                <img
                  src="./profile-photo.jpg"
                  alt="Profile Photo"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-gray-700 text-sm">Maulana Malik</div>
              </div>
              <div className="flex justify-between items-center mt-11">
                <div className="text-gray-500 font-bold">
                  <p>Akreditasi</p>
                  <p>A</p>
                </div>
                <div className="text-gray-700 text-sm">
                  <p>Location</p>
                  <p>Surabaya, Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={ImageCard}
              alt="Card 1"
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">SMAN 1 Surabaya</div>
              <div className="flex items-center">
                <img
                  src="./profile-photo.jpg"
                  alt="Profile Photo"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-gray-700 text-sm">Maulana Malik</div>
              </div>
              <div className="flex justify-between items-center mt-11">
                <div className="text-gray-500 font-bold">
                  <p>Akreditasi</p>
                  <p>A</p>
                </div>
                <div className="text-gray-700 text-sm">
                  <p>Location</p>
                  <p>Surabaya, Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={ImageCard}
              alt="Card 1"
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">SMAN 1 Surabaya</div>
              <div className="flex items-center">
                <img
                  src="./profile-photo.jpg"
                  alt="Profile Photo"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-gray-700 text-sm">Maulana Malik</div>
              </div>
              <div className="flex justify-between items-center mt-11">
                <div className="text-gray-500 font-bold">
                  <p>Akreditasi</p>
                  <p>A</p>
                </div>
                <div className="text-gray-700 text-sm">
                  <p>Location</p>
                  <p>Surabaya, Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={ImageCard}
              alt="Card 1"
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">SMAN 1 Surabaya</div>
              <div className="flex items-center">
                <img
                  src="./profile-photo.jpg"
                  alt="Profile Photo"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-gray-700 text-sm">Maulana Malik</div>
              </div>
              <div className="flex justify-between items-center mt-11">
                <div className="text-gray-500 font-bold">
                  <p>Akreditasi</p>
                  <p>A</p>
                </div>
                <div className="text-gray-700 text-sm">
                  <p>Location</p>
                  <p>Surabaya, Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={ImageCard}
              alt="Card 1"
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">SMAN 1 Surabaya</div>
              <div className="flex items-center">
                <img
                  src="./profile-photo.jpg"
                  alt="Profile Photo"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-gray-700 text-sm">Maulana Malik</div>
              </div>
              <div className="flex justify-between items-center mt-11">
                <div className="text-gray-500 font-bold">
                  <p>Akreditasi</p>
                  <p>A</p>
                </div>
                <div className="text-gray-700 text-sm">
                  <p>Location</p>
                  <p>Surabaya, Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={ImageCard}
              alt="Card 1"
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">SMAN 1 Surabaya</div>
              <div className="flex items-center">
                <img
                  src="./profile-photo.jpg"
                  alt="Profile Photo"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-gray-700 text-sm">Maulana Malik</div>
              </div>
              <div className="flex justify-between items-center mt-11">
                <div className="text-gray-500 font-bold">
                  <p>Akreditasi</p>
                  <p>A</p>
                </div>
                <div className="text-gray-700 text-sm">
                  <p>Location</p>
                  <p>Surabaya, Jawa Timur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Student;
