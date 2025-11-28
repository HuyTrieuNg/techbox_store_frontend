import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Khởi tạo client bên ngoài handler để tận dụng caching kết nối (nếu có)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // 1. Lấy dữ liệu thô từ client
    const body = await request.json();
    const { rawDescription } = body;

    if (!rawDescription) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp mô tả sản phẩm (rawDescription)" },
        { status: 400 }
      );
    }

    // 2. Thiết lập Prompt 
    const prompt = `
      Bạn là một chuyên gia Copywriter và SEO hàng đầu về sản phẩm công nghệ (Tech Reviewer).
      Nhiệm vụ của bạn là viết lại mô tả sản phẩm dựa trên thông tin thô bên dưới.
      QUAN TRỌNG: cKhông được bịa đặt thông tin, chỉ sử dụng dữ liệu đã cho.

      Yêu cầu đầu ra:
      1. **Giọng văn:** Chuyên nghiệp, thu hút, khơi gợi cảm xúc mua hàng (như các trang TechBox, CellphoneS, TGDĐ).
      2. **Tối ưu SEO:** Lồng ghép từ khóa tự nhiên, tập trung vào lợi ích người dùng thay vì chỉ liệt kê thông số.
      3. **Định dạng:** Sử dụng Markdown chuẩn.
         - Tiêu đề chính (H1) hấp dẫn.
         - Các tiêu đề phụ (H2, H3) rõ ràng.
         - Sử dụng danh sách (bullet points) cho các tính năng nổi bật.
         - Tạo bảng thông số kỹ thuật (nếu có đủ dữ liệu).
      4. **Nội dung:**
         - Đoạn mở đầu: Tóm tắt điểm mạnh nhất (Hook).
         - Thân bài: Phân tích chi tiết (Hiệu năng, Thiết kế, Màn hình, v.v.).
         - Kết luận: Tại sao nên mua ngay lúc này?

      Thông tin sản phẩm thô:
      "${rawDescription}"
    `;

    // 3. Gọi Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite", 
      contents: prompt,
      config: {
        temperature: 0.7, 
      }
    });

    // 4. Trả về kết quả
    const generatedText = response.text; 

    return NextResponse.json({ 
      success: true,
      data: generatedText 
    });

  } catch (error: any) {
    console.error("Lỗi gọi Gemini API:", error);
    return NextResponse.json(
      { error: "Không thể tạo nội dung", details: error.message },
      { status: 500 }
    );
  }
}