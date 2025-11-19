"use client"

import { Calendar, ExternalLink, Mail, MapPin } from "lucide-react"
import { useState } from "react"

import { ImageLightbox } from "@/components/ImageLightbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import groupPhotos from "@/data/group-photos.json"
import peopleData from "@/data/people.json"

export default function PeoplePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentMembers = peopleData.filter(p => p.status === "current")
  const alumni = peopleData.filter(p => p.status === "alumni")

  // Helper function to get primary link (website > scholar > other)
  const getPrimaryLink = (person: typeof peopleData[0]) => {
    if (!person.links) return null
    if (person.links.website) return person.links.website
    if (person.links.scholar) return person.links.scholar
    const otherLinks = Object.values(person.links)
    return otherLinks.length > 0 ? otherLinks[0] : null
  }

  const pi = currentMembers.find(p => p.role === "Principal Investigator")
  const phd = currentMembers.filter(p => p.role === "PhD Student")
  const masters = currentMembers.filter(p => p.role === "Master Student")
  const visiting = currentMembers.filter(p => p.role === "Visiting Scholar")
  const staff = currentMembers.filter(p => p.role === "Research Staff" || p.role === "Software Engineer")
  const admin = currentMembers.filter(p => p.role === "Lab Administration")

  // Prepare images for lightbox - just the URLs
  const groupPhotoImages = groupPhotos.map((photo) => photo.image)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Team
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We are a diverse group of researchers working at the intersection of neuroscience,
              machine learning, and computer vision.
            </p>
          </div>
        </div>
      </section>

      {/* Principal Investigator */}
      {pi && (
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <h2 className="mb-8 text-2xl font-bold">Principal Investigator</h2>
            <Card className="max-w-4xl">
              <CardHeader>
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                  {pi.avatar && (
                    <div className="size-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-border">
                      <img
                        src={pi.avatar}
                        alt={pi.name}
                        className="size-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-2xl">
                      {getPrimaryLink(pi) ? (
                        <a
                          href={getPrimaryLink(pi) as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {pi.name}
                        </a>
                      ) : (
                        pi.name
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2 text-lg">{pi.title}</CardDescription>
                    {pi.bio && (
                      <p className="mt-4 leading-relaxed text-muted-foreground">{pi.bio}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {pi.email && (
                    <a
                      href={`mailto:${pi.email}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="size-4" />
                      {pi.email}
                    </a>
                  )}
                  {pi.links && Object.entries(pi.links).map(([key, url]) => {
                    const displayName = key === 'website' ? 'Website' : key.charAt(0).toUpperCase() + key.slice(1)
                    return (
                      <a
                        key={key}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="size-4" />
                        {displayName}
                      </a>
                    )
                  })}
                </div>
                {pi.tags && pi.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pi.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* PhD Students */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="section-container">
          <h2 className="mb-8 text-2xl font-bold">PhD Students</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {phd.map((person) => (
              <Card key={person.id} className="group transition-all hover:shadow-soft-lg">
                <CardHeader>
                  <div className="mb-3 flex items-start gap-4">
                    {person.avatar && (
                      <div className="relative size-28 shrink-0 overflow-hidden rounded-xl ring-2 ring-border">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="size-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {getPrimaryLink(person) ? (
                          <a
                            href={getPrimaryLink(person) as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {person.name}
                          </a>
                        ) : (
                          person.name
                        )}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                    </div>
                  </div>
                  {person.project && (
                    <CardDescription className="mt-2">{person.project}</CardDescription>
                  )}
                  {person.cosupervised && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Co-supervised with {person.cosupervised}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {person.links && (
                    <div className="mb-3 flex flex-wrap gap-3">
                      {Object.entries(person.links).map(([key, url]) => {
                        const displayName = key === 'website' ? 'Website' : key.charAt(0).toUpperCase() + key.slice(1)
                        return (
                          <a
                            key={key}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="size-3" />
                            {displayName}
                          </a>
                        )
                      })}
                    </div>
                  )}
                  {person.tags && person.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {person.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Master Students */}
      {masters.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <h2 className="mb-8 text-2xl font-bold">Master Students</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {masters.map((person) => (
                <Card key={person.id} className="group transition-all hover:shadow-soft-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-start gap-4">
                      {person.avatar && (
                        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl ring-2 ring-border">
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="size-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg leading-tight">
                          {getPrimaryLink(person) ? (
                            <a
                              href={getPrimaryLink(person) as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {person.name}
                            </a>
                          ) : (
                            person.name
                          )}
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                    {person.project && (
                      <CardDescription className="mt-2">{person.project}</CardDescription>
                    )}
                    {person.cosupervised && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Co-supervised with {person.cosupervised}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {person.links && (
                      <div className="mb-3 flex flex-wrap gap-3">
                        {Object.entries(person.links).map(([key, url]) => {
                          const displayName = key === 'website' ? 'Website' : key.charAt(0).toUpperCase() + key.slice(1)
                          return (
                            <a
                              key={key}
                              href={url as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="size-3" />
                              {displayName}
                            </a>
                          )
                        })}
                      </div>
                    )}
                    {person.tags && person.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {person.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visiting Scholars */}
      {visiting.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="section-container">
            <h2 className="mb-8 text-2xl font-bold">Visiting Scholars</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiting.map((person) => (
                <Card key={person.id} className="group transition-all hover:shadow-soft-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-start gap-4">
                      {person.avatar && (
                        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl ring-2 ring-border">
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="size-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg leading-tight">
                          {getPrimaryLink(person) ? (
                            <a
                              href={getPrimaryLink(person) as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {person.name}
                            </a>
                          ) : (
                            person.name
                          )}
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                    {person.project && (
                      <CardDescription className="mt-2">{person.project}</CardDescription>
                    )}
                    {person.note && (
                      <p className="mt-2 text-sm italic text-muted-foreground">{person.note}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {person.links && (
                      <div className="mb-3 flex flex-wrap gap-3">
                        {Object.entries(person.links).map(([key, url]) => {
                          const displayName = key === 'website' ? 'Website' : key.charAt(0).toUpperCase() + key.slice(1)
                          return (
                            <a
                              key={key}
                              href={url as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="size-3" />
                              {displayName}
                            </a>
                          )
                        })}
                      </div>
                    )}
                    {person.tags && person.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {person.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Research Staff */}
      {staff.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <h2 className="mb-8 text-2xl font-bold">Research Staff</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {staff.map((person) => (
                <Card key={person.id} className="group transition-all hover:shadow-soft-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-start gap-4">
                      {person.avatar && (
                        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl ring-2 ring-border">
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="size-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg leading-tight">
                          {getPrimaryLink(person) ? (
                            <a
                              href={getPrimaryLink(person) as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {person.name}
                            </a>
                          ) : (
                            person.name
                          )}
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                    {person.project && (
                      <CardDescription className="mt-2">{person.project}</CardDescription>
                    )}
                    {person.note && (
                      <p className="mt-2 text-sm italic text-muted-foreground">{person.note}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {person.links && (
                      <div className="mb-3 flex flex-wrap gap-3">
                        {Object.entries(person.links).map(([key, url]) => (
                          <a
                            key={key}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="size-3" />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </a>
                        ))}
                      </div>
                    )}
                    {person.tags && person.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {person.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lab Administration */}
      {admin.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="section-container">
            <h2 className="mb-8 text-2xl font-bold">Lab Administration</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {admin.map((person) => (
                <Card key={person.id} className="group transition-all hover:shadow-soft-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-start gap-4">
                      {person.avatar && (
                        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl ring-2 ring-border">
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="size-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg leading-tight">
                          {getPrimaryLink(person) ? (
                            <a
                              href={getPrimaryLink(person) as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {person.name}
                            </a>
                          ) : (
                            person.name
                          )}
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                    {person.project && (
                      <CardDescription className="mt-2">{person.project}</CardDescription>
                    )}
                    {person.note && (
                      <p className="mt-2 text-sm italic text-muted-foreground">{person.note}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {person.links && (
                      <div className="mb-3 flex flex-wrap gap-3">
                        {Object.entries(person.links).map(([key, url]) => (
                          <a
                            key={key}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="size-3" />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </a>
                        ))}
                      </div>
                    )}
                    {person.tags && person.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {person.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alumni */}
      {alumni.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="section-container">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-2xl font-bold">Lab Alumni</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {alumni.map((person) => (
                <Card key={person.id} className="group transition-all hover:shadow-soft-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-start gap-4">
                      {person.avatar && (
                        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl ring-2 ring-border">
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="size-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg leading-tight">
                          {getPrimaryLink(person) ? (
                            <a
                              href={getPrimaryLink(person) as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {person.name}
                            </a>
                          ) : (
                            person.name
                          )}
                        </CardTitle>
                        {person.degree && (
                          <Badge variant="outline" className="mt-1 text-xs">{person.degree}</Badge>
                        )}
                      </div>
                    </div>
                    {person.project && (
                      <CardDescription className="mt-2">
                        <span className="font-medium">Research:</span> {person.project}
                      </CardDescription>
                    )}
                    {person.graduationYear && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Graduated {person.graduationSeason} {person.graduationYear}
                      </p>
                    )}
                    {person.currentPosition && (
                      <p className="mt-2 text-sm font-medium text-foreground">
                        Now: {person.currentPosition}
                      </p>
                    )}
                    {person.note && (
                      <p className="mt-2 text-sm italic text-muted-foreground">{person.note}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {person.links && (
                      <div className="mb-3 flex flex-wrap gap-3">
                        {Object.entries(person.links).map(([key, url]) => (
                          <a
                            key={key}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="size-3" />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </a>
                        ))}
                      </div>
                    )}
                    {person.tags && person.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {person.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Group Photos */}
      {groupPhotos.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <h2 className="mb-8 text-2xl font-bold">Group Photos</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupPhotos.map((photo, idx) => (
                <Card key={photo.id} className="group overflow-hidden transition-all hover:shadow-soft-lg">
                  <button
                    type="button"
                    onClick={() => openLightbox(idx)}
                    className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                  </button>
                  <CardHeader>
                    <CardTitle className="text-lg">{photo.title}</CardTitle>
                    <CardDescription className="mt-2">{photo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <span>{new Date(photo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span>{photo.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ImageLightbox
              images={groupPhotoImages}
              currentIndex={currentImageIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              onNavigate={setCurrentImageIndex}
              title="Group Photos"
            />
          </div>
        </section>
      )}
    </div>
  )
}
