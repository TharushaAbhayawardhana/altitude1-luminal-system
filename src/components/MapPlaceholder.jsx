import { MapPin } from 'lucide-react'

export default function MapPlaceholder() {
  return (
    <div className="glass rounded-2xl h-64 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-8 w-8 text-text-secondary mx-auto mb-2" />
        <p className="text-text-secondary text-sm">Map Integration</p>
        <p className="text-text-secondary text-xs">Colombo, Sri Lanka</p>
      </div>
    </div>
  )
}
