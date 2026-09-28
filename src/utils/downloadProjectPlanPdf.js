import { jsPDF } from 'jspdf';

import projectPlanningQuestions from '../data/projectPlanningQuestions.js';

const downloadProjectPlanPdf = (summary, submittedName) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const gold = [212, 175, 55];
  const black = [0, 0, 0];
  const dark = [25, 25, 25];
  const grey = [95, 95, 95];
  const lightGrey = [235, 235, 235];

  let y = 22;

  const addPageIfNeeded = (requiredHeight = 15) => {
    if (y + requiredHeight > pageHeight - 18) {
      doc.addPage();
      y = 22;
    }
  };

  const addSectionTitle = (title, subtitle = '') => {
    addPageIfNeeded(25);

    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 14, y);

    y += 7;

    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(title.toUpperCase(), margin, y);

    y += 4;

    if (subtitle) {
      doc.setTextColor(...grey);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);

      const subtitleLines = doc.splitTextToSize(
        subtitle,
        contentWidth
      );

      doc.text(subtitleLines, margin, y);

      y += subtitleLines.length * 3.8;
    }

    y += 6;
  };

  const addBodyText = (
    text,
    {
      fontSize = 9,
      color = dark,
      bold = false,
      spacingAfter = 5,
    } = {}
  ) => {
    if (!text) {
      return;
    }

    doc.setTextColor(...color);
    doc.setFont(
      'helvetica',
      bold ? 'bold' : 'normal'
    );
    doc.setFontSize(fontSize);

    const lines = doc.splitTextToSize(
      String(text),
      contentWidth
    );

    const lineHeight = fontSize * 0.45;

    addPageIfNeeded(
      lines.length * lineHeight + spacingAfter
    );

    doc.text(lines, margin, y);

    y += lines.length * lineHeight;
    y += spacingAfter;
  };

  const addBullet = (text, number) => {
    if (!text) {
      return;
    }

    const bulletX = margin;
    const textX = margin + 9;
    const bulletWidth = contentWidth - 9;

    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);

    doc.text(
      String(number).padStart(2, '0'),
      bulletX,
      y
    );

    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    const lines = doc.splitTextToSize(
      String(text),
      bulletWidth
    );

    const lineHeight = 4.2;

    addPageIfNeeded(
      lines.length * lineHeight + 5
    );

    doc.text(lines, textX, y);

    y += lines.length * lineHeight;
    y += 5;
  };

  /*
   * --------------------------------------------------
   * PDF HEADER
   * --------------------------------------------------
   */

  doc.setFillColor(...black);
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setTextColor(...gold);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('RIYADVI', margin, 16);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  doc.text(
    'SOFTWARE & DIGITAL SOLUTIONS',
    margin,
    22
  );

  doc.setTextColor(...gold);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);

  doc.text(
    'PROJECT PLANNING GUIDE',
    pageWidth - margin,
    16,
    { align: 'right' }
  );

  doc.setTextColor(190, 190, 190);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);

  doc.text(
    new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    pageWidth - margin,
    22,
    { align: 'right' }
  );

  y = 47;

  /*
   * --------------------------------------------------
   * TITLE
   * --------------------------------------------------
   */

  doc.setTextColor(...black);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);

  const titleLines = doc.splitTextToSize(
    'Your Project Plan',
    contentWidth
  );

  doc.text(titleLines, margin, y);

  y += titleLines.length * 9;

  doc.setTextColor(...grey);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  const introLines = doc.splitTextToSize(
    submittedName
      ? `Prepared for ${submittedName}. This plan summarizes the initial direction based on the information provided through the Riyadvi Software Project Planning Guide.`
      : 'This plan summarizes the initial direction based on the information provided through the Riyadvi Software Project Planning Guide.',
    contentWidth
  );

  y += 4;

  doc.text(introLines, margin, y);

  y += introLines.length * 4.5 + 8;

  /*
   * --------------------------------------------------
   * PROJECT SNAPSHOT
   * --------------------------------------------------
   */

  addSectionTitle(
    'Project Snapshot',
    'Initial assessment based on your selected requirements.'
  );

  const cardGap = 5;
  const cardWidth =
    (contentWidth - cardGap) / 2;
  const cardHeight = 30;

  addPageIfNeeded(cardHeight + 8);

  doc.setFillColor(248, 248, 246);

  doc.roundedRect(
    margin,
    y,
    cardWidth,
    cardHeight,
    2,
    2,
    'F'
  );

  doc.roundedRect(
    margin + cardWidth + cardGap,
    y,
    cardWidth,
    cardHeight,
    2,
    2,
    'F'
  );

  doc.setTextColor(...gold);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);

  doc.text(
    'PROJECT COMPLEXITY',
    margin + 5,
    y + 8
  );

  doc.text(
    'TARGET TIMELINE',
    margin + cardWidth + cardGap + 5,
    y + 8
  );

  doc.setTextColor(...black);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);

  doc.text(
    summary.complexity.label,
    margin + 5,
    y + 17
  );

  doc.text(
    summary.timeline,
    margin + cardWidth + cardGap + 5,
    y + 17
  );

  doc.setTextColor(...grey);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);

  doc.text(
    `Planning score: ${summary.complexity.totalScore}`,
    margin + 5,
    y + 24
  );

  doc.text(
    'Based on your selected launch preference',
    margin + cardWidth + cardGap + 5,
    y + 24
  );

  y += cardHeight + 12;

  /*
   * --------------------------------------------------
   * PROJECT REQUIREMENTS
   * --------------------------------------------------
   */

  addSectionTitle(
    'Project Requirements',
    'Your selected project direction.'
  );

  summary.selectedOptions.forEach((item) => {
    addPageIfNeeded(28);

    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);

    doc.text(
      item.questionId
        ? String(
            projectPlanningQuestions.find(
              (questionData) =>
                questionData.id ===
                item.questionId
            )?.number || ''
          )
        : '',
      margin,
      y
    );

    doc.setTextColor(...grey);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);

    doc.text(
      item.category || '',
      margin + 14,
      y
    );

    y += 6;

    doc.setTextColor(...black);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);

    const optionLines = doc.splitTextToSize(
      item.optionLabel || '',
      contentWidth - 14
    );

    doc.text(
      optionLines,
      margin + 14,
      y
    );

    y += optionLines.length * 4.5;

    if (item.optionDescription) {
      doc.setTextColor(...grey);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);

      const descriptionLines =
        doc.splitTextToSize(
          item.optionDescription,
          contentWidth - 14
        );

      doc.text(
        descriptionLines,
        margin + 14,
        y
      );

      y += descriptionLines.length * 3.8;
    }

    y += 6;

    doc.setDrawColor(...lightGrey);
    doc.setLineWidth(0.25);

    if (y < pageHeight - 15) {
      doc.line(
        margin,
        y,
        pageWidth - margin,
        y
      );
    }

    y += 6;
  });

  /*
   * --------------------------------------------------
   * RECOMMENDED APPROACH
   * --------------------------------------------------
   */

  addSectionTitle(
    'Recommended Approach',
    'Initial planning considerations based on your answers.'
  );

  summary.approach.forEach(
    (recommendation, index) => {
      addBullet(
        recommendation,
        index + 1
      );
    }
  );

  /*
   * --------------------------------------------------
   * FOOTER
   * --------------------------------------------------
   */

  const totalPages =
    doc.internal.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page += 1
  ) {
    doc.setPage(page);

    doc.setDrawColor(...lightGrey);
    doc.setLineWidth(0.3);

    doc.line(
      margin,
      pageHeight - 13,
      pageWidth - margin,
      pageHeight - 13
    );

    doc.setTextColor(...grey);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);

    doc.text(
      'Riyadvi Software Technologies',
      margin,
      pageHeight - 7
    );

    doc.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 7,
      { align: 'right' }
    );
  }

  /*
   * --------------------------------------------------
   * DOWNLOAD
   * --------------------------------------------------
   */

  const safeName =
    String(submittedName || 'Project')
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const filename = `Riyadvi-Project-Plan-${safeName || 'Project'}.pdf`;

  doc.save(filename);
};

export default downloadProjectPlanPdf;
