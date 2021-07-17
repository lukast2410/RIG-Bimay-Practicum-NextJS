import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { formatDate } from './helper'

const listShift = [
	{ id: 1, Name: '1 (07:20 - 09:00)' },
	{ id: 2, Name: '2 (09:20 - 11:00)' },
	{ id: 3, Name: '3 (11:20 - 13:00)' },
	{ id: 4, Name: '4 (13:20 - 15:00)' },
	{ id: 5, Name: '5 (15:20 - 17:00)' },
	{ id: 6, Name: '6 (17:20 - 19:00)' },
	{ id: 7, Name: '7 (19:20 - 21:00)' },
	{ id: 8, Name: '8 (21:20 - 23:00)' },
]

export const handlePrintReport = (extra) => {
  const doc = new jsPDF('p', 'pt', 'a4')
  const verticalStart = 90
  const tableData = []
  extra.details.forEach((x, idx) => {
    tableData.push({
      no: idx + 1,
      nim: x.StudentId,
      name: x.StudentName,
      status: x.Status,
      class: x.InsideStudent ? 'Yes' : 'No'
    })
  })
  const presents = extra.details.filter(x => x.Status == 'Present')
  const gotInvolvement = presents.length / extra.details.length > 0.3

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('Extra Class Report', 40, 50)

  doc.setLineWidth(2.5)
  doc.line(40, 65, 555, 65)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  // ast
  doc.text('Assistant 1', 40, verticalStart)
  doc.text(`: ${extra.Assistant1}`, 120, verticalStart)
  doc.text('Assistant 2', 40, verticalStart + 20)
  doc.text(`: ${extra.Assistant2 == '' ? '-' : extra.Assistant2}`, 120, verticalStart + 20)

  doc.text(`${formatDate(new Date(extra.ExtraClassDate))}`, 555, verticalStart, { align: 'right' })
  doc.text('Course', 40, verticalStart + 40)
  doc.text(`: ${extra.Course}`, 120, verticalStart + 40)
  doc.text('Room', 40, verticalStart + 60)
  doc.text(`: ${extra.Room}`, 120, verticalStart + 60)
  doc.text('Shift', 40, verticalStart + 80)
  doc.text(`: ${listShift[extra.Shift - 1].Name}`, 120, verticalStart + 80)
  doc.text('Present Count', 40, verticalStart + 100)
  doc.text(`: ${presents.length}`, 120, verticalStart + 100)
  
  if(gotInvolvement)
    doc.addImage('/assets/involvement.png', 'PNG', 460, verticalStart + 10, 95, 60)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Attendance Informations', 40, verticalStart + 135)
  autoTable(doc, {
    body: tableData,
    styles: {
      fontSize: 10,
    },
    columns: [
      { header: 'No.', dataKey: 'no' },
      { header: 'NIM', dataKey: 'nim' },
      { header: 'Name', dataKey: 'name' },
      { header: 'Status', dataKey: 'status' },
      { header: `Class ${extra.Class}`, dataKey: 'class' },
    ],
    startY: verticalStart + 145,
    theme: 'striped',
    didParseCell: (data) => {
      if(data.column.dataKey == 'status'){
        data.cell.styles.halign = 'center'
        if(data.cell.raw == 'Present'){
          data.cell.styles.textColor = '#059669'
        }else if(data.cell.raw == 'Absent'){
          data.cell.styles.textColor = '#DC2626'
        }
      }else if(data.column.dataKey == 'class'){
        data.cell.styles.halign = 'center'
      }else if(data.column.dataKey == 'no'){
        data.cell.styles.halign = 'center'
      }
    }
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  const pageCount = doc.getNumberOfPages()
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setLineWidth(1.5)
    doc.line(40, 797, 555, 797)
    doc.text(`Software Laboratory Center`, 555, 810, { align: 'right' })
    doc.text('Page ' + i + ' of ' + pageCount, 40, 810)
  }

  doc.save(`${extra.Assistant1} & ${extra.Assistant2} - ${extra.Course}.pdf`)
}