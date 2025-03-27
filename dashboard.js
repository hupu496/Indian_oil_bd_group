document.addEventListener("DOMContentLoaded", () => {
  // Bootstrap modals
  const reportModalEl = document.getElementById("reportModal")
  const pdfModalEl = document.getElementById("pdfModal")

  let reportModal, pdfModal

  if (reportModalEl) {
    reportModal = new bootstrap.Modal(reportModalEl)
  }

  if (pdfModalEl) {
    pdfModal = new bootstrap.Modal(pdfModalEl)
  }

  // Report click handlers
  const reportLinks = document.querySelectorAll(".report-list a")
  const reportTitle = document.getElementById("reportTitle")
  const reportDetails = document.getElementById("reportDetails")

  if (reportLinks && reportTitle && reportDetails) {
    reportLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const reportId = this.getAttribute("data-report")
        openReportModal(reportId)
      })
    })
  }

  // Comment submission
  const submitComment = document.getElementById("submitComment")
  const commentText = document.getElementById("commentText")
  const commentsList = document.getElementById("commentsList")

  if (submitComment && commentText && commentsList) {
    submitComment.addEventListener("click", () => {
      const comment = commentText.value.trim()
      if (comment) {
        addComment(comment)
        commentText.value = ""
      }
    })
  }

  // Function to open report modal
  function openReportModal(reportId) {
    // In a real application, you would fetch this data from a server
    const reportData = getReportData(reportId)

    reportTitle.textContent = reportData.title

    // Clear previous details
    reportDetails.innerHTML = ""

    // Add report sections to the list
    reportData.sections.forEach((section) => {
      const li = document.createElement("li")
      li.className = "list-group-item"
      li.textContent = section.title
      li.addEventListener("click", () => {
        openPdfViewer(section.pdfUrl, section.title)
      })
      reportDetails.appendChild(li)
    })

    reportModal.show()
  }

  // Function to open PDF viewer
  function openPdfViewer(pdfUrl, title) {
    const pdfTitle = document.getElementById("pdfTitle")
    const pdfViewer = document.getElementById("pdfViewer")

    if (pdfTitle && pdfViewer) {
      pdfTitle.textContent = title

      // In a real application, this would be a URL to your PDF file
      // For this demo, we'll use Google's PDF viewer with a sample PDF
      pdfViewer.src = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`

      // Load comments for this PDF
      loadComments(pdfUrl)

      reportModal.hide()
      pdfModal.show()
    }
  }

  // Function to add a comment
  function addComment(text) {
    const comment = document.createElement("div")
    comment.className = "comment"

    const header = document.createElement("div")
    header.className = "comment-header"

    const author = document.createElement("span")
    author.className = "comment-author"
    author.textContent = "You"

    const date = document.createElement("span")
    date.className = "comment-date"
    date.textContent = new Date().toLocaleString()

    const content = document.createElement("div")
    content.className = "comment-content"
    content.textContent = text

    header.appendChild(author)
    header.appendChild(date)
    comment.appendChild(header)
    comment.appendChild(content)

    commentsList.appendChild(comment)

    // In a real application, you would save this comment to a server
  }

  // Function to load comments for a PDF
  function loadComments(pdfUrl) {
    // In a real application, you would fetch comments from a server
    // For this demo, we'll use some sample comments
    const comments = [
      {
        author: "John Doe",
        date: "2023-03-15 10:30",
        text: "Great report! The financial projections look promising.",
      },
      {
        author: "Jane Smith",
        date: "2023-03-15 11:45",
        text: "I have some concerns about section 3. Can we discuss this in the next meeting?",
      },
    ]

    // Clear previous comments
    commentsList.innerHTML = ""

    // Add comments to the list
    comments.forEach((commentData) => {
      const comment = document.createElement("div")
      comment.className = "comment"

      const header = document.createElement("div")
      header.className = "comment-header"

      const author = document.createElement("span")
      author.className = "comment-author"
      author.textContent = commentData.author

      const date = document.createElement("span")
      date.className = "comment-date"
      date.textContent = commentData.date

      const content = document.createElement("div")
      content.className = "comment-content"
      content.textContent = commentData.text

      header.appendChild(author)
      header.appendChild(date)
      comment.appendChild(header)
      comment.appendChild(content)

      commentsList.appendChild(comment)
    })
  }

  // Mock data function - in a real app, this would come from an API
  function getReportData(reportId) {
    const reports = {
      report1: {
        title: "Q1 Financial Report",
        sections: [
          {
            title: "Executive Summary",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            title: "Financial Statements",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            title: "Market Analysis",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
        ],
      },
      report2: {
        title: "Q2 Financial Report",
        sections: [
          {
            title: "Executive Summary",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            title: "Financial Statements",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            title: "Projections",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
        ],
      },
      report3: {
        title: "Q3 Financial Report",
        sections: [
          {
            title: "Letter to Shareholders",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            title: "Financial Overview",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            title: "Business Segments",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
          {
            title: "Future Outlook",
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          },
        ],
      },
    }

    return reports[reportId] || { title: "Unknown Report", sections: [] }
  }
})

<script>
        document.addEventListener('DOMContentLoaded', function() {
            // Handle proceed button clicks (open PDF)
            const proceedButtons = document.querySelectorAll('.proceed-btn');
            proceedButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pdfUrl = this.getAttribute('data-pdf');
                    window.open(pdfUrl, '_blank');
                });
            });

            // Handle report title clicks (also open PDF)
            const reportTitles = document.querySelectorAll('.report-title');
            reportTitles.forEach(title => {
                title.addEventListener('click', function(e) {
                    e.preventDefault();
                    const reportId = this.getAttribute('data-report');
                    const pdfUrl = document.querySelector(`.proceed-btn[data-report="${reportId}"]`).getAttribute('data-pdf');
                    window.open(pdfUrl, '_blank');
                });
            });

            // Handle comment button clicks
            // const commentButtons = document.querySelectorAll('.comment-btn');
            // const reportIdInput = document.getElementById('reportId');
            
            // commentButtons.forEach(button => {
            //     button.addEventListener('click', function() {
            //         const reportId = this.getAttribute('data-report');
            //         reportIdInput.value = reportId;
                    
            //         // Update modal title with report name
            //         const reportName = this.closest('.report-item').querySelector('.report-title').textContent;
            //         document.getElementById('commentModalLabel').textContent = `Add Comment for ${reportName}`;
            //     });
            // });

            // Handle comment submission
            const submitButton = document.getElementById('submitComment');
            submitButton.addEventListener('click', function() {
                const reportId = document.getElementById('reportId').value;
                const commentText = document.getElementById('commentText').value;
                
                if (commentText.trim() === '') {
                    alert('Please enter a comment before submitting.');
                    return;
                }
                
                // Here you would typically send the data to your server
                console.log('Submitting comment for report:', reportId);
                console.log('Comment:', commentText);
                
                // Reset form and close modal
                document.getElementById('commentForm').reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
                modal.hide();
                
                // Show success message (optional)
                alert('Comment submitted successfully!');
            });
        });
    
        document.addEventListener('DOMContentLoaded', function() {
            // Handle proceed button clicks (open PDF)
            const proceedButtons = document.querySelectorAll('.proceed-btn');
            proceedButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pdfUrl = this.getAttribute('data-pdf');
                    window.open(pdfUrl, '_blank');
                });
            });

            // Handle report title clicks (also open PDF)
            const reportTitles = document.querySelectorAll('.report-title');
            reportTitles.forEach(title => {
                title.addEventListener('click', function(e) {
                    e.preventDefault();
                    const reportId = this.getAttribute('data-report');
                    const pdfUrl = document.querySelector(`.proceed-btn[data-report="${reportId}"]`).getAttribute('data-pdf');
                    window.open(pdfUrl, '_blank');
                });
            });

            // Handle comment button clicks
            const commentButtons = document.querySelectorAll('.comment-btn');
            const reportIdInput = document.getElementById('reportId');
            
            commentButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const reportId = this.getAttribute('data-report');
                    reportIdInput.value = reportId;
                    
                    // Update modal title with report name
                    const reportName = this.closest('.report-item').querySelector('.report-title').textContent;
                    document.getElementById('commentModalLabel').textContent = `Add Comment for ${reportName}`;
                });
            });

            // Handle comment submission
            const submitButton = document.getElementById('submitComment');
            submitButton.addEventListener('click', function() {
                const reportId = document.getElementById('reportId').value;
                const commentText = document.getElementById('commentText').value;
                
                if (commentText.trim() === '') {
                    alert('Please enter a comment before submitting.');
                    return;
                }
                
                // Here you would typically send the data to your server
                console.log('Submitting comment for report:', reportId);
                console.log('Comment:', commentText);
                
                // Reset form and close modal
                document.getElementById('commentForm').reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
                modal.hide();
                
                // Show success message (optional)
                alert('Comment submitted successfully!');
            });
        });
    

