"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { leads } from "@/data/leads";

const collator = new Intl.Collator("en");

const segments = ["All", ...Array.from(new Set(leads.map((lead) => lead.segment)))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [segment, setSegment] = useState("All");

  const filteredLeads = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    const filtered = leads.filter((lead) => {
      const matchesSegment = segment === "All" || lead.segment === segment;
      if (!matchesSegment) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        lead.name.toLowerCase().includes(query) ||
        lead.instagramHandle.toLowerCase().includes(query) ||
        lead.focus.toLowerCase().includes(query)
      );
    });

    return filtered.sort((a, b) => collator.compare(a.name, b.name));
  }, [searchTerm, segment]);

  return (
    <div className="min-h-screen bg-slate-900 py-16">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 rounded-3xl bg-white px-6 py-10 shadow-xl sm:px-10 lg:px-16">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Lead Vault · Beauty & Personal Care
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              50 Indian Beauty & Personal Care Startups on Instagram
            </h1>
            <p className="text-base text-slate-600 md:text-lg">
              A curated, ready-to-outreach list of high-growth Indian beauty brands. Use the search and
              filters to focus on the verticals that match your agency&apos;s sweet spot.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                Total Leads
              </p>
              <p className="text-3xl font-semibold text-slate-900">{leads.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                Showing Now
              </p>
              <p className="text-3xl font-semibold text-slate-900">{filteredLeads.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                Segments Covered
              </p>
              <p className="text-3xl font-semibold text-slate-900">{segments.length - 1}</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-[1fr_minmax(0,200px)]">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Search
              </span>
              <input
                type="search"
                placeholder="Search by brand, handle, or focus"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none ring-slate-400 transition focus:ring"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Segment
              </span>
              <select
                value={segment}
                onChange={(event) => setSegment(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none ring-slate-400 transition focus:ring"
              >
                {segments.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {filteredLeads.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm font-medium text-slate-500">
              No leads match your filters yet. Try widening your search or clearing the segment filter.
            </p>
          )}
        </section>

        <section className="overflow-x-auto rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100/80">
              <tr className="text-left text-xs font-semibold uppercase tracking-widest text-slate-500">
                <th className="px-5 py-3">Brand</th>
                <th className="px-5 py-3">Focus</th>
                <th className="px-5 py-3">Segment</th>
                <th className="px-5 py-3 text-right">Instagram</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
              {filteredLeads.map((lead) => (
                <tr key={lead.instagramHandle} className="hover:bg-slate-50/80">
                  <td className="px-5 py-4 font-semibold text-slate-900">{lead.name}</td>
                  <td className="px-5 py-4">{lead.focus}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {lead.segment}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={lead.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700"
                    >
                      @{lead.instagramHandle}
                      <span aria-hidden>↗</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-slate-100">
          <h2 className="text-xl font-semibold">How to use this list</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-200">
            <li>
              Prioritise brands already investing in content or influencer marketing—their Instagram activity
              is a strong signal of budgets and agility.
            </li>
            <li>
              Personalise outreach by referencing recent campaigns or product drops; save top prospects into
              your CRM right from this dashboard.
            </li>
            <li>
              Revisit regularly and expand with your own research—this base list gives you 50 proven starting
              points in the Indian beauty ecosystem.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
