var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
// router.get('/:link', function(req, res, next) {
  
//   var pageLink = 'categories/' +  req.params.link;
//   Product.find(function(err,docs){
//     if(err){
//       res.render('/');
//     }
//     res.render(pageLink, { title: 'BioMedical', products:docs });
//   })
// });

// Home Care Equipments

router.get('/homeCare', function(req,res,next){
  res.render('categories/homeCare', {title:'BioMedical'});
})

router.get('/respiratoryCare', function(req,res,next){
  var categArray = ['Bipap & Cpap Machine', 'Nebulizer Machine', 'Oxygen concentrator machine', 'Respiratory Mask', 'Spirometer- Incentive Spirometer'];
  Product.find({'subCategory1' : 'RC'}, function(err,docs){
    if(err){
      res.render('/');
    }
   
    res.render('categories/respiratoryCare', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/healthPersonalCare', function(req,res,next){
  var categArray = ['Fitness Equipment', 'Step Counter/Padometer', 'Massager', 'Body Care', 'Hearing Machine'];
  Product.find({'subCategory1' : 'HPC'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/healthPersonalCare', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/mobileAid', function(req,res,next){
  var categArray = ['Walking Sticks', 'Walker', 'Commode Chair', 'Under Arm Crutches'];
  Product.find({'subCategory1' : 'MA'},function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/mobileAid', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/supportBracesSplints', function(req,res,next){
  var categArray = ['Ankle & Foot Supports', 'Arm Supports', 'Back Support', 'Body Belts', 'Hand and Wrist Braces', 'Hip Support', 'Shoulder Support', 'Waist & Abdomen Supports', 'Splints'];
  Product.find({'subCategory1' : 'SBS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/supportBracesSplints', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/physiotherapyRehabilitation', function(req,res,next){
  var categArray = ['Physiotherapy Equipment', 'Rehabilitation Belts', 'Heating Pads', 'Rehabilitation Equipment', 'Acupressure Devices', 'Rehab Cushions', 'Heat Therapy Equipment', 'Cold Therapy Equipment', 'Knee cap', 'Hernia Belt'];
  Product.find({'subCategory1' : 'PR'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/physiotherapyRehabilitation', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/homeCareEquipments', function(req,res,next){
  var categArray = ['Air Bed Mattress For Patients', 'Heart Rate Monitor', 'Heartbeat watch', 'Insulin Pump'];
  Product.find({'subCategory1' : 'HCE'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/homeCareEquipments', {title:'BioMedical', products:docs, categories:categArray});
  })
})

// ICU Critical Care

router.get('/IcuCriticalCare', function(req,res,next){
  res.render('categories/IcuCriticalCare', {title:'BioMedical'});
})

router.get('/ventilatorMachine', function(req,res,next){
  var categArray = ['ICU Ventilator', 'Portable Ventilator', 'Neonatal Ventilator', 'HFNC Devices ( High Flow Oxygen Therapy )','Bubble CPAP', 'Ventilator Accessories', 'Air Oxygen Blender', 'Respiratory Humidifier'];
  Product.find({'subCategory1' : 'VM'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/ventilatorMachine', {title:'BioMedical', products:docs, categories : categArray});
  })
})

router.get('/defAedPacemakers', function(req,res,next){
  var categArray = ['Defibrillator', 'AED, Automatic External Defibrillator', 'Pacemakers', 'AED Trainers or AED Training Units','Defibrillator AED Pads', 'Chest Compressor (CPR) Machine'];
  Product.find({'subCategory1' : 'DAP'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/defAedPacemakers', {title:'BioMedical', products:docs, categories : categArray});
  })
})

router.get('/infusionPump', function(req,res,next){
  var categArray = ['Fluid and Blood Warmer', 'Syringe Infusion Pump', 'Volumetric infusion pump', 'Feeding Pump','PCA Pump'];
  Product.find({'subCategory1' : 'IP'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/infusionPump', {title:'BioMedical', products:docs, categories : categArray});
  })
})

router.get('/patientMonitoringSystem', function(req,res,next){
  var categArray = ['Cardiac Monitor', 'ICU Monitor', 'Multipara Monitor', 'Bedside Monitor & Portable Patient Monitor','Vital Signs Monitor', 'Pulse Oximeter', 'Capnography Etco2 Monitor', 'Fetal Monitor/Fetal Doppler', 'Patient Monitor Accessories', 'Central Patient Monitoring System', 'Patient Monitor', 'Hemodynamic Monitor'];
  Product.find({'subCategory1' : 'PMS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/patientMonitoringSystem', {title:'BioMedical', products:docs, categories : categArray});
  })
})

router.get('/dialysisEquipment', function(req,res,next){
  var categArray = ['Dialysis Machine', 'Dialyzer', 'Transducer Protector', 'Dialyzer Reprocessing Machine','F6 Dialyzer', 'Nipro Dialyzer', 'Peritoneal Dialysis Equipment'];
  Product.find({'subCategory1' : 'DE'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/dialysisEquipment', {title:'BioMedical', products:docs, categories : categArray});
  })
})

// no sub categories
router.get('/abgAnalyzer', function(req,res,next){
  
  Product.find({'subCategory1' : 'ABGA'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/abgAnalyzer', {title:'BioMedical', products:docs});
  })

})

router.get('/compressionPump', function(req,res,next){
  var categArray = ['DVT Pump', 'Lymphedema Pump', 'DVT Pump Sleeves'];
  Product.find({'subCategory1' : 'CP'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/compressionPump', {title:'BioMedical', products:docs, categories : categArray});
  })
})

// Have to check
router.get('/electroMedicalEquipment', function(req,res,next){
  Product.find({'subCategory1' : 'EME'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/electroMedicalEquipment', {title:'BioMedical', products:docs});
  })
})

// OT Equipments

router.get('/OTEquipments', function(req,res,next){
  res.render('categories/OTEquipments', {title:'BioMedical'}); 
})

router.get('/suctionMachine', function(req,res,next){
  var categArray = ['Electric Suction Machine Trolley', 'Portable Suction Machine ', 'Manual Foot Suction Machine', 'Manual Hand suction pump','Liposuction Machine', 'Theater Suction Trolley', 'Silicone Vacuum Cup'];
  Product.find({'subCategory1' : 'SM'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/suctionMachine', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/anaesthesiology', function(req,res,next){
  var categArray = ['Anesthesia Machine', 'Laryngoscope', 'Anesthesia Ventilator', 'Anesthesia Vaporizer', 'Guedel Airway'];
  Product.find({'subCategory1' : 'AE'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/anaesthesiology', {title:'BioMedical', products:docs, categories:categArray});
  }) 
})

router.get('/surgeryTable', function(req,res,next){
  var categArray = ['OT Light', 'Cautery', 'OT Table', 'C-ARM Machine', 'Surgical Microscope', 'Endoscope', 'Surgeon Headlamp','Laparoscopic Instruments', 'CO2 Insufflator'];
  Product.find({'subCategory1' : 'SETS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/surgeryTable', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/sterilizationEquipment', function(req, res, next){
  var categArray = ['Autoclave machine', 'Sterilizers', 'Medical Refrigerators', 'Formalin Chambers'];
  Product.find({'subCategory1' : 'SE'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/sterilizationEquipment', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/surgicalEquipments', function(req, res, next){
  var categArray = ['Surgical Scissors', 'Surgical Trays', 'Surgical Forceps & Clamps', 'Speculum', 'Dilator & Curette', 'Surgical Saw', 'Urine Pot', 'Bed Pan'];
  Product.find({'subCategory1' : 'SI'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/surgicalEquipments', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/dermatologyEquipments', function(req,res,next){
  var categArray = ['Skin Treatment Laser Machine', 'CO2 Fractional Laser Machine', 'Dermascope', 'Dermapen', 'Derma Rollers', 'UVB Lamp', 'Diode Laser Hair Removal Machine'];
  Product.find({'subCategory1' : 'DE'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/dermatologyEquipments', {title:'BioMedical', products:docs, categories:categArray});
  })
})

// Diagnostic & Imaging

router.get('/diagnosticImaging', function(req,res,next){
  res.render('categories/diagnosticImaging', {title:'BioMedical'});
})

router.get('/littmannStethoscope', function(req,res,next){
  var categArray = ['Littmann Classic 2 Stethoscope', 'Littmann Classic 3 Stethoscope', 'Littmann Cardiology 3 Stethoscope', 'Littmann Cardiology 4 Stethoscope', 'Littmann Light Weight Stethoscope', 'Littmann Electronic Stethoscope', 'Littmann Stethoscope Spare Parts'];
  Product.find({'subCategory1' : 'LS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/littmannStethoscope', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/generalDiagnostics', function(req,res,next){
  var categArray = ['BP Machine', 'Glucometer', 'Infantometers', 'Stethoscope', 'Oximeter', 'Height Measuring Scale/ Stadiometer', 'Body Composition Monitor', 'Weighing Scales', 'Otoscope', 'Ophthalmoscopes', 'Reflex Hammer', 'Thermometer'];
  Product.find({'subCategory1' : 'GD'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/generalDiagnostics', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/electrocardiographs', function(req,res,next){
  var categArray = ['ECG Machine', 'Electrocardiogram Machine', 'Single Channel ECG Machine', '3 Channel ECG Machine', '6 Channel ECG Machine', '12 Channel ECG Machine', 'TMT Machine', 'Holter Monitor', 'ECG Accessories'];
  Product.find({'subCategory1' : 'EC'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/electrocardiographs', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/radiology', function(req,res,next){
  var categArray = ['Xray Machine', 'Ultrasound Machine', 'CR and DR System', 'MRI Machine', 'CT Scan Machine', 'Mammography', 'Medical Imaging Accessories', 'X Ray Protection Products'];
  Product.find({'subCategory1' : 'RI'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/radiology', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/electroDiagnostic', function(req,res,next){
  var categArray = ['Spirometer machine', 'EEG Machine', 'EMG Machine', 'Biothesiometer', 'Monofilaments', 'EEG Cap Electrode', 'Audiometer'];
  Product.find({'subCategory1' : 'EE'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/electroDiagnostic', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/poctDevices', function(req,res,next){
  var categArray = ['Cholesterol Checker', 'Uric Acid Meter', 'ACT Machine', 'Cardiac Marker', 'Human Body Voltage Checker'];
  Product.find({'subCategory1' : 'POCT'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/poctDevices', {title:'BioMedical', products:docs, categories:categArray});
  })
})

// Supplies & Accessories

router.get('/suppliesAccessories', function(req,res,next){
  res.render('categories/suppliesAccessories', {title:'BioMedical'});
})

router.get('/surgicalWoundCareDressing', function(req,res,next){
  var categArray = ['First Aid Box', 'Crepe, Compression & Adhesive Bandage', 'Wound Dressing', 'Surgical and Medical Tapes', 'Gauze Swabs', 'Eye Patch', 'Alcohol Swabs and Wipes', 'Medical Dressing', 'Fiberglass Casting & POP Bandage', 'Nasal Packing/Dressing', 'Steri Strip/Wound Closure Strips'];
  Product.find({'subCategory1' : 'SWC'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/surgicalWoundCareDressing', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/medicalClothingUniformsLinen', function(req,res,next){
  var categArray = ['Doctor Apron & Coat', 'Nursing Staff Clothing', 'Surgical Cap', 'Surgical Mask', 'Hospital Shoes', 'Woman Dress/Coats', 'Hospital Linen', 'Hospital Uniforms', 'OT Linen', 'Medical Pads', 'Medical Gloves'];
  Product.find({'subCategory1' : 'MUL'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/medicalClothingUniformsLinen', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/disposablesConsumables', function(req,res,next){
  var categArray = ['Surgical Gloves', 'Medical Tubes', 'Surgical Disposables', 'Cautery Pencil', 'Adult Diapers', 'Body Wipes', 'Respiratory & Anaesthesia', 'ECG Paper', 'Anaesthetic Face Mask', 'Romsons Disposables & consumables'];
  Product.find({'subCategory1' : 'DC'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/disposablesConsumables', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/medicalEquipment', function(req,res,next){
  var categArray = ['ECG Accessories', 'Spo2 Sensors', 'BP Cuffs', 'Temperature Sensors', 'Flow Sensors', 'Ultrasound Paper & Accessories', 'Surgical Accessories', 'Medical Batteries'];
  Product.find({'subCategory1' : 'MEA'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/medicalEquipment', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/surgicalSupplies', function(req,res,next){
  var categArray = ['Surgical Sutures', 'Surgical Staplers & Cutters', 'Surgical Blades & Scalpel', 'Surgical Mops and Sponges', 'Bone Wax', 'Hernia Mesh', 'Surgical Drapes', 'Absorbable Hemostats','Vacuum Suction Set', 'Skin Marker', 'Sealants & Tissue Adhesives', 'Prolene Suture', 'Ethilon Suture'];
  Product.find({'subCategory1' : 'SS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/surgicalSupplies', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/syringesSupplies', function(req,res,next){
  var categArray = ['Feeding Bag', 'Needles & Syringes', 'Medical Tubes & Infusion set', 'IV Cannula', 'Vials and Tubes', 'Catheters', 'Scalp Vein Set', 'Stopcock'];
  Product.find({'subCategory1' : 'SIO'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/syringesSupplies', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/medicalSupplies', function(req,res,next){
  var categArray = ['Medical Models & Charts', 'Cleaning & Biomedical Waste Management', 'Dialysis Supplies', 'Point of care Testing'];
  Product.find({'subCategory1' : 'MS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/medicalSupplies', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/bioWasteProducts', function(req,res,next){
  var categArray = ['Bio Medical Waste bins', 'BioHazard Bags'];
  Product.find({'subCategory1' : 'BWP'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/bioWasteProducts', {title:'BioMedical', products:docs, categories:categArray});
  })
})


// Hospital Furnitures

router.get('/hospitalFurnitures', function(req,res,next){
  res.render('categories/hospitalFurnitures', {title:'BioMedical'});
})

router.get('/stretcher', function(req,res,next){
  var categArray = ['Stretcher Trolley', 'Ambulance Stretcher', 'Scoop stretcher', 'Folding Stretcher', 'Spine Board', 'Basket Stretcher', 'Patient Lifter'];
  Product.find({'subCategory1' : 'STR'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/stretcher', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/hospitalBeds', function(req,res,next){
  var categArray = ['Electric Hospital Bed', 'Simple hospital Patient bed', 'Orthopedic Bed', 'Manual Hospital Bed', 'Fowler Bed', 'Dialysis Bed cum chair', 'Medical Cradle'];
  Product.find({'subCategory1' : 'HB'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/hospitalBeds', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/hospitalChair', function(req,res,next){
  var categArray = ['Hospital Waiting Chair', 'Dialysis Chair', 'ENT Chair', 'Wheelchair', 'Phlebotomy Blood Collection Chair', 'Surgical Chair/Stool', 'Evacuation/Stair Climbing Wheelchair','Bath/Shower Chair'];
  Product.find({'subCategory1' : 'HC'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/hospitalChair', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/hospitalTrolley', function(req,res,next){
  var categArray = ['Monitor Trolley', 'Dressing Trolley', 'Instrument Trolley', 'Laparoscopic Trolley', 'Crash Cart Trolley', 'Linen Trolley', 'Baby Trolley','Emergency trolley', 'Medicine trolley'];
  Product.find({'subCategory1' : 'HT'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/hospitalTrolley', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/hospitalStands', function(req,res,next){
  var categArray = ['IV Stand', 'Rolling Stand', 'Monitor Stand', 'Hospital Wash Basin Stand'];
  Product.find({'subCategory1' : 'HS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/hospitalStands', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/hospitalTableStool', function(req,res,next){
  var categArray = ['Overbed/Bedside Table', 'Examination Table/Examination Couch', 'Delivery and Labour Table', 'Bedside Lockers', 'Orthopaedic Table/Fracture Table', 'Hospital Working Table', 'Patient Stool/Hospital Stool'];
  Product.find({'subCategory1' : 'HTHS'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/hospitalTableStool', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/otherMedicalFurnitures', function(req,res,next){
  var categArray = ['Hospital Cabinet', 'Hospital Bed Mattress', 'Surgical Scrub Station', 'Bedside Screen', 'Hospital Furniture Spare Parts'];
  Product.find({'subCategory1' : 'OMF'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/otherMedicalFurnitures', {title:'BioMedical', products:docs, categories:categArray});
  })
})


// COVID-19 Products

router.get('/covid19', function(req,res,next){
  res.render('categories/covid19', {title:'BioMedical'});
})

router.get('/faceMask', function(req,res,next){
  var categArray = ['3 Ply Face Mask', 'N95 Respirator Mask', 'N95 Mask'];
  Product.find({'subCategory1' : 'FaMa'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/faceMask', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/handSanitizer', function(req,res,next){
  var categArray = ['Alcohol Based Hand Sanitizer', '3M Hand Sanitizer', 'Surface & Aerial Disinfectant', 'Hand Sanitizer Spray'];
  Product.find({'subCategory1' : 'HSD'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/handSanitizer', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/personalEquipment', function(req,res,next){
  var categArray = ['PPE Kits', 'Face Shields', 'Safety Goggles', 'Disposable Gloves', 'Medical Caps', 'Disposable Shoe Cover', 'Surgical Gown'];
  Product.find({'subCategory1' : 'PPE'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/personalEquipment', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/fumigationMachine', function(req,res,next){
  var categArray = ['ULV Fogger Machine', 'Thermal Fogger Machine'];
  Product.find({'subCategory1' : 'FuMa'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/fumigationMachine', {title:'BioMedical', products:docs, categories:categArray});
  })
})

// single Page category
router.get('/infraredThermometers', function(req,res,next){
  // var categArray = ['Face Mask', 'Hand Sanitizer & Disinfectant'];
  Product.find({'subCategory1' : 'INCT'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/infraredThermometers', {title:'BioMedical', products:docs});
  })
})

router.get('/diagnosticTestKit', function(req,res,next){
  var categArray = ['RT PCR Test Kit', 'COVID-19 Test Kit'];
  Product.find({'subCategory1' : 'DTK'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/diagnosticTestKit', {title:'BioMedical', products:docs, categories:categArray});
  })
})

router.get('/medicalMask', function(req,res,next){
  var categArray = ['Nasal Cannula', 'Venturi Mask','Oxygen Mask', 'High flow nasal cannula', 'Oxygen Reservoir Bag', 'CPR Mask'];
  Product.find({'subCategory1' : 'MM'}, function(err,docs){
    if(err){
      res.render('/');
    }
    res.render('categories/medicalMask', {title:'BioMedical', products:docs, categories:categArray});
  })
})

module.exports = router;