import Image from 'next/image';
import beyondLogo from './../assets/images/beyond.logo.png';
import {
  UserIcon,
  EnvelopeIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <div className="relative w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
      {/* Logo on the left */}
      <div>
        <Image src={beyondLogo} alt="beyond-logo" width={120} height={100} />
      </div>

      {/* Icons on the right */}
      <div className="flex items-center gap-4 cursor-pointer">
        {/* Mail Icon */}
        <EnvelopeIcon className="w-5 h-5 text-gray-600 hover:text-blue-500" />

        {/* Bell Icon */}
        <BellIcon className="w-5 h-5 text-gray-600 hover:text-blue-500" />

        {/* User Icon with Name */}
        <div className="flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-gray-600 hover:text-blue-500" />
          <label className="text-sm text-gray-700">Pravallika</label>
        </div>
      </div>
    </div>
  );
}
