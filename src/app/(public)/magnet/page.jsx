import React from 'react'
import Header from './components/Header'
import { Cards } from './components/Cards'
import DataTable from './components/DataTable'
import MagnetModal from './components/MagnetModal'

export default function page() {
  return (
    <div>
      <Header />
      <div className="p-6 mt-10 not-first:mt-10">
        <Cards />
      </div>
      <DataTable />
    </div>
  )
}
