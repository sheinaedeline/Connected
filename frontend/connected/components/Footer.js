import Link from "next/link";
import Image from 'next/image';
import logo from "assets/Logo Expanded.png";
import { AiOutlineMail } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className="text-black dark:text-gray-300 body-font">
      {/* Footer */}
      <div className="mt-10 border-t-2 border-gray-200">
              <div className="flex justify-between justify-center items-center">
                <Link href="/company">
                    <Image
                        src={logo}
                        width={150}
                        alt="connected logo"
                        className="opacity-50"
                    />
                </Link>
                <div className="flex flex-center gap-2 pr-5 opacity-50">
                  <div>Reach out to us</div>
                  <AiOutlineMail size={26}/>
                </div>
              </div>
            </div>
    </footer>
  );
}
