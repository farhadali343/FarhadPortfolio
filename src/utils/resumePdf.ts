import { jsPDF } from 'jspdf';
import {
  CONTACT_CONFIG,
  EXPERTISE_CATEGORIES,
  PROFILE,
  TOOL_ECOSYSTEM,
  getPublicEducation,
  getPublicExperience,
  getPublicMetrics,
  getPublicProjects,
} from '../data/portfolioData';

export function generateResumePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2; // 178mm
  const bottomLimit = pageHeight - 18;
  let y = 18;

  const colors = {
    ink: [21, 25, 31] as [number, number, number],
    muted: [95, 105, 118] as [number, number, number],
    accent: [37, 99, 235] as [number, number, number],
    border: [226, 230, 236] as [number, number, number],
  };

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > bottomLimit) {
      doc.addPage();
      y = 18;
    }
  };

  const addSectionHeader = (title: string) => {
    ensureSpace(14);
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...colors.accent);
    doc.text(title.toUpperCase(), marginX, y);
    y += 2;
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.35);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 5.5;
  };

  const addWrappedText = (
    text: string,
    x: number,
    maxWidth: number,
    fontSize: number,
    color: [number, number, number] = colors.ink,
    style: 'normal' | 'bold' = 'normal',
    lineHeightMm = 4.4
  ) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    for (const line of lines) {
      ensureSpace(lineHeightMm + 1);
      doc.text(line, x, y);
      y += lineHeightMm;
    }
  };

  const addLinkRow = (label: string, links: typeof CONTACT_CONFIG.socialLinks) => {
    if (links.length === 0) return;
    ensureSpace(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.3);
    doc.setTextColor(...colors.ink);
    const labelText = `${label}: `;
    doc.text(labelText, marginX, y);
    let cursorX = marginX + doc.getTextWidth(labelText);

    doc.setFont('helvetica', 'normal');
    for (let i = 0; i < links.length; i++) {
      const item = links[i];
      const text = item.value;
      const textW = doc.getTextWidth(text);
      const sep = i < links.length - 1 ? '  ·  ' : '';
      const sepW = doc.getTextWidth(sep);

      if (cursorX + textW > pageWidth - marginX) {
        cursorX = marginX + doc.getTextWidth(labelText);
        y += 4.1;
        ensureSpace(5);
      }

      doc.setTextColor(...colors.accent);
      doc.textWithLink(text, cursorX, y, { url: item.href! });
      cursorX += textW;

      if (sep && cursorX + sepW < pageWidth - marginX) {
        doc.setTextColor(...colors.muted);
        doc.text(sep, cursorX, y);
        cursorX += sepW;
      }
    }
    y += 4.5;
  };

  // 1. Header Block (Left identity + Right contact summary)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...colors.ink);
  doc.text(PROFILE.name, marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...colors.accent);
  const emailDisplay = CONTACT_CONFIG.email;
  const emailW = doc.getTextWidth(emailDisplay);
  doc.textWithLink(emailDisplay, pageWidth - marginX - emailW, y - 0.5, {
    url: `mailto:${CONTACT_CONFIG.email}`,
  });

  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...colors.accent);
  doc.text(PROFILE.primaryPositioning, marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...colors.muted);
  doc.text(PROFILE.locationLine, pageWidth - marginX, y, { align: 'right' });

  y += 5;
  doc.setFontSize(8.5);
  doc.setTextColor(...colors.muted);
  doc.text(
    `${PROFILE.availability.label}   |   Languages: ${PROFILE.languages
      .map((l) => l.name)
      .join(', ')}`,
    marginX,
    y
  );
  y += 5.5;

  const businessLinks = CONTACT_CONFIG.socialLinks.filter((l) => l.href && !l.isPlaceholder);
  const channelLinks = CONTACT_CONFIG.channelLinks.filter((l) => l.href && !l.isPlaceholder);
  addLinkRow('Business Profiles', businessLinks);
  addLinkRow('Channels & Stores', channelLinks);

  // 2. Professional Summary
  addSectionHeader('Professional Summary');
  for (const paragraph of PROFILE.aboutSummary) {
    addWrappedText(paragraph, marginX, contentWidth, 9.2, colors.ink, 'normal', 4.5);
    y += 1.6;
  }

  // 3. Selected Outcomes (Clean 2-Column Aligned Grid)
  const metrics = getPublicMetrics();
  if (metrics.length > 0) {
    addSectionHeader('Selected Outcomes');
    const colGap = 10;
    const colWidth = (contentWidth - colGap) / 2;

    for (let i = 0; i < metrics.length; i += 2) {
      ensureSpace(9);
      const left = metrics[i];
      const right = metrics[i + 1];

      const renderMetricCell = (m: typeof left, cellX: number) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...colors.ink);
        doc.text(m.value, cellX, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.8);
        doc.setTextColor(...colors.ink);
        doc.text(m.label, cellX + 20, y);

        doc.setFontSize(7.8);
        doc.setTextColor(...colors.muted);
        doc.text(`${m.project} · ${m.auditDate}`, cellX + 20, y + 3.8);
      };

      renderMetricCell(left, marginX);
      if (right) {
        renderMetricCell(right, marginX + colWidth + colGap);
      }
      y += 9;
    }
  }

  // 4. Independent Projects & Digital Ventures
  addSectionHeader('Independent Projects & Digital Ventures');
  const experiences = getPublicExperience();
  for (const exp of experiences) {
    ensureSpace(22);

    // Role on left, Timeframe cleanly right-aligned
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(...colors.ink);
    doc.text(exp.role, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...colors.muted);
    doc.text(exp.timeframe, pageWidth - marginX, y, { align: 'right' });
    y += 4.3;

    // Project group + platforms
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(...colors.accent);
    doc.text(exp.projectGroup, marginX, y);
    const groupW = doc.getTextWidth(exp.projectGroup);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.muted);
    const metaSuffix = `  ·  ${exp.platforms}`;
    if (groupW + doc.getTextWidth(metaSuffix) <= contentWidth) {
      doc.text(metaSuffix, marginX + groupW, y);
      y += 4.8;
    } else {
      y += 4;
      addWrappedText(exp.platforms, marginX, contentWidth, 8.3, colors.muted, 'normal', 4);
      y += 0.8;
    }

    // Properly indented bullet list (wrapped lines align with text, not bullet)
    for (const item of exp.responsibilities) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.9);
      const lines = doc.splitTextToSize(item, contentWidth - 6) as string[];
      ensureSpace(lines.length * 4.3 + 1);
      doc.setTextColor(...colors.muted);
      doc.text('•', marginX + 1.5, y);
      doc.setTextColor(...colors.ink);
      for (const line of lines) {
        doc.text(line, marginX + 6, y);
        y += 4.3;
      }
    }
    y += 3;
  }

  // 5. Core Expertise (Clean 2-Column Aligned Grid)
  addSectionHeader('Core Expertise');
  const skillColGap = 10;
  const skillColWidth = (contentWidth - skillColGap) / 2;

  for (let i = 0; i < EXPERTISE_CATEGORIES.length; i += 2) {
    const leftCat = EXPERTISE_CATEGORIES[i];
    const rightCat = EXPERTISE_CATEGORIES[i + 1];

    const measureCatHeight = (cat: typeof leftCat | undefined): number => {
      if (!cat) return 0;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.3);
      const text = cat.skills.map((s) => s.name).join('  ·  ');
      const lines = doc.splitTextToSize(text, skillColWidth) as string[];
      return 5 + lines.length * 4 + 3;
    };

    const blockHeight = Math.max(measureCatHeight(leftCat), measureCatHeight(rightCat));
    ensureSpace(blockHeight);
    const startY = y;

    const renderSkillCol = (cat: typeof leftCat, colX: number) => {
      let localY = startY;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...colors.ink);
      doc.text(cat.title, colX, localY);
      localY += 4.3;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.3);
      doc.setTextColor(...colors.muted);
      const text = cat.skills.map((s) => s.name).join('  ·  ');
      const lines = doc.splitTextToSize(text, skillColWidth) as string[];
      for (const line of lines) {
        doc.text(line, colX, localY);
        localY += 4;
      }
    };

    renderSkillCol(leftCat, marginX);
    if (rightCat) {
      renderSkillCol(rightCat, marginX + skillColWidth + skillColGap);
    }
    y = startY + blockHeight;
  }

  // 6. Selected Portfolio Initiatives
  addSectionHeader('Selected Portfolio Initiatives');
  const publicProjects = getPublicProjects().slice(0, 8);
  for (const proj of publicProjects) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const summaryLines = doc.splitTextToSize(proj.summary, contentWidth - 2) as string[];
    ensureSpace(5 + summaryLines.length * 4 + 2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...colors.ink);
    doc.text(proj.title, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...colors.muted);
    doc.text(proj.primaryCategory, pageWidth - marginX, y, { align: 'right' });
    y += 4.2;

    doc.setFontSize(8.5);
    for (const line of summaryLines) {
      doc.text(line, marginX, y);
      y += 4;
    }
    y += 2;
  }

  // 7. Tools & Platforms (Aligned Label + Value Columns)
  addSectionHeader('Tools & Platforms');
  const labelColWidth = 46;
  const valueColWidth = contentWidth - labelColWidth;

  for (const group of TOOL_ECOSYSTEM) {
    const toolsText = group.tools.map((t) => t.name).join(' · ');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    const lines = doc.splitTextToSize(toolsText, valueColWidth) as string[];
    ensureSpace(lines.length * 4.2 + 2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(...colors.ink);
    doc.text(group.category, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.muted);
    for (const line of lines) {
      doc.text(line, marginX + labelColWidth, y);
      y += 4.2;
    }
    y += 1.2;
  }

  // 8. Verified Education (omits pending_confirmation entries)
  const verifiedEducation = getPublicEducation();
  if (verifiedEducation.length > 0) {
    addSectionHeader('Education');
    for (const edu of verifiedEducation) {
      addWrappedText(
        `${edu.credential} — ${edu.institution} (${edu.year})`,
        marginX,
        contentWidth,
        8.8,
        colors.ink,
        'normal',
        4.3
      );
    }
  }

  // Subtle Page Numbers Footer on All Pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.25);
    doc.line(marginX, pageHeight - 13, pageWidth - marginX, pageHeight - 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...colors.muted);
    doc.text(`${PROFILE.name} — Curriculum Vitae`, marginX, pageHeight - 9);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - marginX, pageHeight - 9, {
      align: 'right',
    });
  }

  doc.save('Farhad-Ali-Resume.pdf');
}
