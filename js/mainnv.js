// Quản lý nhân viên


let store = new PhoneStore(1, "Phone Store");
let filteredList = null;
let imageDataURL = "";
let isEditing = false; // Biến để theo dõi trạng thái sửa
let editingStaffId = null; // Biến để lưu ID sản phẩm đang sửa

store.loadStaffFromLocalStorage();
function renderStaffList() {
    let staffList = filteredList ?? store.getListStaff();

    let html = ``;
    for (let i = 0; i < staffList.length; i++) {
        let staff = staffList[i];
        // console.log(staff);
        html +=
            `
        <tr>
            <td>${staff.id_staff}</td>
            <td>${staff.name_staff}</td>
            <td>${staff.age_staff}</td>
            <td>${staff.gender_staff}</td>
            <td>${staff.phone_staff}</td>
            <td>${staff.email_staff}</td>
            <td style="max-width: 200px;">${staff.address_staff}</td>
            <td class="d-flex justify-content-center align-items-center mx-auto">
                <button class="btn btn-danger" onclick="removeStaff('${staff.id_staff}')">Xóa</button>
                <button class="btn btn-warning" onclick="showUpdateForm('${staff.id_staff}')">Sửa</button>

            </td>
        `
    }
    document.getElementById("staffList").innerHTML = html;
}

// document.getElementById("productImage").addEventListener("change", function () {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             imageDataURL = e.target.result; // Lưu dữ liệu hình ảnh dưới dạng Data URL
//             document.getElementById("previewImage").src = imageDataURL;
//             // Bạn có thể lưu `e.target.result` này vào thuộc tính sản phẩm nếu cần
//         };

//         reader.readAsDataURL(file);
//     }
// });

// document.getElementById("productImage").addEventListener("change", function () {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             imageDataURL = e.target.result;
//             document.getElementById("previewImage").src = imageDataURL;
//         };
//         reader.readAsDataURL(file);
//     }
// });

// document.getElementById("productImage").addEventListener("change", function () {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             imageDataURL = e.target.result; // Lưu ảnh dạng base64
//             document.getElementById("previewImage").src = imageDataURL; // Hiển thị ảnh
//         };

//         reader.readAsDataURL(file);
//     }
// });

document.getElementById("staffForm").addEventListener("submit", addStaff);

function addStaff(event) {
    event.preventDefault();

    let id = document.getElementById("staffId").value.trim();
    let name = document.getElementById("staffName").value.trim();
    let age = Number(document.getElementById("staffAge").value);
    let gender = (document.getElementById("staffGender").value);
    let phone = document.getElementById("staffPhone").value.trim();
    let email = document.getElementById("staffEmail").value.trim();
    let address = document.getElementById("staffAddress").value;

    if (!id || !name || isNaN(age) || !gender || !phone || !email || !address) {
        alert("Vui lòng nhập đầy đủ thông tin nhân viên!");
        return;
    }

    let newStaff = new Staff(id, name, age, gender, phone, email, address);
    if (isEditing) {
        // Cập nhật nhân viên
        store.updateStaff(editingStaffId, newStaff);
        store.saveStaffToLocalStorage();
        renderStaffList();
        isEditing = false; // Reset trạng thái sửa
        editingStaffId = null;
    }
    else {
        store.addStaff(newStaff);
        store.saveStaffToLocalStorage();
        renderStaffList();
    }

    document.getElementById("staffForm").reset();
    // Chuyển focus ra khỏi modal để tránh lỗi accessibility
    // const fallbackBtn = document.getElementById("addStaffBtn");
    // if (fallbackBtn) fallbackBtn.focus();
    // Sau đó đóng modal
    // const modal = bootstrap.Modal.getInstance(document.getElementById('staffModal'));
    // if (modal) modal.hide();
    // Xóa focus khỏi phần tử đang được focus (tránh lỗi aria-hidden)
    document.activeElement.blur();

    // Đóng modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('staffModal'));
    if (modal) modal.hide();

}

function removeStaff(id) {
    let isComfirm = confirm("Bạn có chắc chắn muốn xóa nhân viên này không?");
    if (isComfirm) {
        store.removeStaff(id);
        store.saveStaffToLocalStorage();
        renderStaffList();
    }
}

function showUpdateForm(id) {
    const staff = store.getListStaff().find(s => s.id_staff === id);
    if (!staff) {
        alert("Nhân viên không tồn tại!");
        return;
    }

    // Đổ dữ liệu vào form
    document.getElementById("staffId").value = staff.id_staff;
    document.getElementById("staffName").value = staff.name_staff;
    document.getElementById("staffAge").value = staff.age_staff;
    document.getElementById("staffGender").value = staff.gender_staff;
    document.getElementById("staffPhone").value = staff.phone_staff;
    document.getElementById("staffEmail").value = staff.email_staff;
    document.getElementById("staffAddress").value = staff.address_staff;



    // Cập nhật trạng thái sửa
    isEditing = true;
    editingStaffId = staff.id_staff;

    // Mở modal
    const modal = new bootstrap.Modal(document.getElementById("staffModal"));
    modal.show();
}

// Search sản phẩm
function searchStaff() {
    let searchStaffInput = document.getElementById("searchStaffInput").value.trim();
    if (searchStaffInput === "") {
        filteredList = null; // Hiển thị lại toàn bộ danh sách nếu không có từ khóa tìm kiếm
    } else {
        filteredList = store.getListStaff().filter(staff =>
            staff.name_staff.toLowerCase().includes(searchStaffInput.toLowerCase()) ||
            staff.phone_staff.toLowerCase().includes(searchStaffInput.toLowerCase()) ||
            staff.email_staff.toLowerCase().includes(searchStaffInput.toLowerCase())
        );
    }
    renderStaffList();
}

renderStaffList();