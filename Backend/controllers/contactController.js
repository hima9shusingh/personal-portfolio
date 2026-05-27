import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/emailService.js';

export const submitContact = async (req, res) => {
  try {
    console.log('📨 [CONTACT] Form submitted');
    console.log('📨 [CONTACT] Data:', req.body);

    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields required'
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters'
      });
    }

    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log('✅ [CONTACT] Saved to database');

    // Send email
    const emailResult = await sendContactEmail(name, email, message);
    if (!emailResult.success) {
      console.warn('⚠️ [CONTACT] Email failed but message saved');
    }

    return res.status(201).json({
      success: true,
      message: 'Message received! I will reply within 24 hours.'
    });
  } catch (error) {
    console.error('❌ [CONTACT] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error submitting message'
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    return res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: 'Contact deleted'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting contact'
    });
  }
};
