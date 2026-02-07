/* ========================================
   Bret's Mulching - FAQ Accordion
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  initFaqAccordion();
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');

    question?.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all items (optional - remove for multi-open)
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
