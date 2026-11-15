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
  const contentWidth = pageWidth - marginX * 2;
  const bottomLimit = pageHeight - 16;
  let y = 18;

  const colors = {
    ink: [21, 25, 31] as [number, number, number],
    muted: [104, 113, 125] as [number, number, number],
    accent: [37, 99, 235] as [number, number, number],
    border: [229, 231, 235] as [number, number, number],
  };

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > bottomLimit) {
      doc.addPage();
      y = 18;
    }
  };

  const addSectionHeader = (title: string) => {
    ensureSpace(12);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...colors.accent);
    doc.text(title.toUpperCase(), marginX, y);
    y += 2;
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.35);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 5;
  };

  const addWrappedText = (
    text: string,
    x: number,
    maxWidth: number,
    fontSize: number,
    color: [number, number, number] = colors.ink,
    style: 'normal' | 'bold' = 'normal',
    lineHeightMm = 4.6
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

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...colors.ink);
  doc.text(PROFILE.name, marginX, y);
  y += 6.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...colors.accent);
  doc.text(PROFILE.primaryPositioning, marginX, y);
  y += 5.5;

  // Metadata & Contact Row (ATS-clean selectable text + clickable email link)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...colors.muted);
  const emailDisplay = CONTACT_CONFIG.emailIsPlaceholder
    ? `${CONTACT_CONFIG.email} (placeholder)`
    : CONTACT_CONFIG.email;
  doc.text(`${PROFILE.locationLine}   |   ${PROFILE.availability.label}`, marginX, y);
  y += 4.5;

  doc.setTextColor(...colors.accent);
  doc.textWithLink(emailDisplay, marginX, y, { url: `mailto:${CONTACT_CONFIG.email}` });
  const emailWidth = doc.getTextWidth(emailDisplay);
  doc.setTextColor(...colors.muted);
  doc.text('   |   Languages: English, Urdu', marginX + emailWidth, y);
  y += 4.6;

  // Verified Business & Channel Links
  const publicLinks = [...CONTACT_CONFIG.socialLinks, ...CONTACT_CONFIG.channelLinks].filter(
    (link) => link.href && !link.isPlaceholder
  );
  if (publicLinks.length > 0) {
    let cursorX = marginX;
    doc.setFontSize(8.2);
    for (let i = 0; i < publicLinks.length; i++) {
      const item = publicLinks[i];
      const text = `${item.label}: ${item.value}`;
      const textW = doc.getTextWidth(text);
      if (cursorX + textW > pageWidth - marginX) {
        cursorX = marginX;
        y += 4;
      }
      doc.setTextColor(...colors.accent);
      doc.textWithLink(text, cursorX, y, { url: item.href! });
      cursorX += textW;
      if (i < publicLinks.length - 1) {
        const sep = '   ·   ';
        const sepW = doc.getTextWidth(sep);
        if (cursorX + sepW < pageWidth - marginX) {
          doc.setTextColor(...colors.muted);
          doc.text(sep, cursorX, y);
          cursorX += sepW;
        }
      }
    }
    y += 5;
  } else {
    y += 1;
  }

  // Professional Summary
  addSectionHeader('Professional Summary');
  for (const paragraph of PROFILE.aboutSummary) {
    addWrappedText(paragraph, marginX, contentWidth, 9.5, colors.ink, 'normal', 4.5);
    y += 1.5;
  }

  // Verified Audit Highlights
  const metrics = getPublicMetrics();
  if (metrics.length > 0) {
    addSectionHeader('Verified Historical Audit Highlights');
    const summaryLine = metrics
      .map((m) => `${m.value} ${m.label} (${m.project}, ${m.auditDate})`)
      .join('  •  ');
    addWrappedText(summaryLine, marginX, contentWidth, 9, colors.ink, 'normal', 4.4);
    y += 2;
  }

  // Core Skills & Attribution
  addSectionHeader('Core Expertise & Role Attribution');
  for (const cat of EXPERTISE_CATEGORIES) {
    ensureSpace(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...colors.ink);
    doc.text(cat.title, marginX, y);
    y += 4.2;

    const skillsText = cat.skills.map((s) => `${s.name} [${s.attribution}]`).join('  ·  ');
    addWrappedText(skillsText, marginX + 2, contentWidth - 2, 8.7, colors.muted, 'normal', 4.1);
    y += 1.5;
  }

  // Independent Projects & Digital Ventures
  addSectionHeader('Independent Projects & Digital Ventures');
  const experiences = getPublicExperience();
  for (const exp of experiences) {
    ensureSpace(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...colors.ink);
    doc.text(`${exp.role} — ${exp.projectGroup}`, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...colors.muted);
    const metaRight = `${exp.timeframe}`;
    const metaWidth = doc.getTextWidth(metaRight);
    if (doc.getTextWidth(`${exp.role} — ${exp.projectGroup}`) + metaWidth + 8 < contentWidth) {
      doc.text(metaRight, pageWidth - marginX - metaWidth, y);
    }
    y += 4.3;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...colors.accent);
    doc.text(`${exp.engagementType}  |  Platforms: ${exp.platforms}`, marginX, y);
    y += 4.4;

    for (const item of exp.responsibilities) {
      addWrappedText(`•  ${item}`, marginX + 2, contentWidth - 2, 9, colors.ink, 'normal', 4.3);
    }
    y += 2;
  }

  // Selected Projects Summary
  addSectionHeader('Selected Portfolio Initiatives');
  const publicProjects = getPublicProjects().slice(0, 8);
  for (const proj of publicProjects) {
    ensureSpace(11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.3);
    doc.setTextColor(...colors.ink);
    doc.text(`${proj.title} (${proj.primaryCategory} — ${proj.statusLabel})`, marginX, y);
    y += 4.2;
    addWrappedText(proj.summary, marginX + 2, contentWidth - 2, 8.7, colors.muted, 'normal', 4.1);
    y += 1.2;
  }

  // Tools & Technologies
  addSectionHeader('Tools & Technologies');
  for (const group of TOOL_ECOSYSTEM) {
    ensureSpace(9);
    const line = `${group.category}: ${group.tools
      .map((t) => `${t.name} (${t.attribution})`)
      .join(', ')}`;
    addWrappedText(line, marginX, contentWidth, 8.8, colors.ink, 'normal', 4.2);
    y += 0.8;
  }

  // Verified Education (omits pending_confirmation entries)
  const verifiedEducation = getPublicEducation();
  if (verifiedEducation.length > 0) {
    addSectionHeader('Education');
    for (const edu of verifiedEducation) {
      addWrappedText(
        `${edu.credential} — ${edu.institution} (${edu.year})`,
        marginX,
        contentWidth,
        9,
        colors.ink,
        'normal',
        4.4
      );
    }
  }

  doc.save('Farhad-Ali-Resume.pdf');
}
