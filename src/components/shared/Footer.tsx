import React from 'react';
import { FaDiscord, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='py-5 shadow-lg flex flex-col md:flex-row items-center justify-evenly text-md-start bg-[#181918]'>

      <div className="w-full md:w-1/2 text-light mb-3 md:mb-0">
        <h5 className="text-xl mb-3">GitHub Browser 🚀</h5>
        <p className="text-sm">
          The GitHub User and Repository Explorer is a web app simplifying discovery of GitHub users and repositories. It enables keyword-based user searches, detailed profiles, repository exploration, issue tracking, and personalized recommendations. With bookmarking, activity feeds, and comparisons, it&apos;s a versatile tool for GitHub users.
        </p>
      </div>

      <div className="text-light text-center">
        <h2 className="text-xl mb-3">Connect with me</h2>
        <div className="flex justify-around mb-2">
          <a className="text-white mx-2 hover:scale-105 transition-transform" href="https://discord.gg/tSqtvHUJzE">
            <FaDiscord style={{ width: '25px', height: '25px' }} />
          </a>
          <a className="text-white mx-2 hover:scale-105 transition-transform" href="https://www.linkedin.com/in/avdhesh-varshney/">
            <FaLinkedin style={{ width: '25px', height: '25px' }} />
          </a>
          <a className="text-white mx-2 hover:scale-105 transition-transform" href="https://x.com/__Avdhesh__">
            <FaXTwitter style={{ width: '25px', height: '25px' }} />
          </a>
          <a className="text-white mx-2 hover:scale-105 transition-transform" href="https://www.youtube.com/@Code_A2Z">
            <FaYoutube style={{ width: '25px', height: '25px' }} />
          </a>
          <a className="text-white mx-2 hover:scale-105 transition-transform" href="https://github.com/Avdhesh-Varshney">
            <FaGithub style={{ width: '25px', height: '25px' }} />
          </a>
        </div>

        <p className="text-sm mb-0">{`© ${year} All Rights Reserved`}</p>
        <b className="text-sm">Made By Avdhesh Varshney 👦</b>
      </div>

    </footer>
  )
}

export default Footer;
