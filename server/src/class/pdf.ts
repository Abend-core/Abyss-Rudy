import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import puppeteer from "puppeteer";
import { directory } from "../class/directory";

export class Pdf {
    /**
     * Génère un PDF simple à partir d'un texte.
     * @param text - Texte à insérer dans le PDF.
     * @returns {Promise<Buffer>} Buffer du PDF généré.
     */
    public static async generateFromText(text: string): Promise<Buffer> {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        page.drawText(text || "Document vide");
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }

    /**
     * Génère un PDF à partir d'un contenu HTML via Puppeteer.
     * @param html - Contenu HTML à convertir en PDF.
     * @returns {Promise<Buffer>} Buffer du PDF généré.
     */
    public static async generateFromHtml(html: string): Promise<Buffer> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: "networkidle0" });
        const buffer = await page.pdf({ format: "A4" });

        await browser.close();
        return buffer as Buffer;
    }

    /**
     * Génère un PDF à partir d'un texte et sauvegarde dans un fichier.
     * @param content - Texte à insérer dans le PDF.
     * @param filePath - Chemin complet du fichier de sortie.
     */
    public static async saveToFile(
        content: string,
        filePath: string
    ): Promise<void> {
        const buffer = await this.generateFromText(content);
        await directory.writeBinaryFile(filePath, buffer);
    }

    /**
     * Génère un PDF simple à partir d'un contenu texte (alias generateFromText).
     * @param content - Texte à insérer dans le PDF.
     * @returns {Promise<Buffer>} Buffer du PDF généré.
     */
    public static async generate(content: string): Promise<Buffer> {
        return this.generateFromText(content);
    }

    /**
     * Crée un PDF interactif avec formulaire, champs texte, dropdown, checkbox et zone de dessin.
     * @returns {Promise<Buffer>} Buffer du PDF généré.
     */
    public static async createInteractivePdf(): Promise<Buffer> {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const form = pdfDoc.getForm();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        page.drawText("Formulaire interactif", {
            x: 50,
            y: 750,
            size: 20,
            font,
            color: rgb(0, 0, 0),
        });

        // Champ texte
        const textField = form.createTextField("name");
        textField.setText("Votre nom ici");
        textField.addToPage(page, { x: 50, y: 700, width: 200, height: 20 });

        // Champ date (texte)
        const dateField = form.createTextField("date");
        dateField.setText("JJ/MM/AAAA");
        dateField.addToPage(page, { x: 50, y: 650, width: 200, height: 20 });

        // Dropdown
        const dropdown = form.createDropdown("choices");
        dropdown.addOptions(["Option 1", "Option 2", "Option 3"]);
        dropdown.select("Option 1");
        dropdown.addToPage(page, { x: 50, y: 600, width: 200, height: 20 });

        // Checkbox
        const checkbox = form.createCheckBox("agree");
        checkbox.check();
        checkbox.addToPage(page, { x: 50, y: 550, width: 20, height: 20 });

        // Zone dessin (rectangle)
        page.drawRectangle({
            x: 50,
            y: 400,
            width: 300,
            height: 200,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });

        page.drawText("Zone de croquis (dessin libre)", {
            x: 55,
            y: 590,
            size: 12,
            font,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
}
