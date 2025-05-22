import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://votly.app/public/web/wp-content/themes/Votly-logo-colored.png"
        alt="Votly"
        className= {` ${className}  filter brightness-0 saturate-100 `}
      />
    </Link>
  );
}