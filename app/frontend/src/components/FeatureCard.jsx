import { Link } from 'react-router-dom'

export default function FeatureCard({ title, description, icon, color, bg, to, index = 0 }) {
  return (
    <Link
      to={to}
      className="group block p-5 rounded-xl border bg-surface hover:bg-surface2 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent/10 cursor-pointer animate-fade-up"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${bg} ${color} transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display font-700 text-text1 text-sm mb-2 tracking-tight group-hover:text-accent transition-colors duration-150">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-text2 leading-relaxed mb-4">{description}</p>

      {/* Learn more link */}
      <div className="flex items-center gap-1.5 text-xs font-600 text-text3 group-hover:text-accent transition-colors duration-150">
        <span>Learn more</span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="transition-transform duration-150 group-hover:translate-x-1"
        >
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </Link>
  )
}
