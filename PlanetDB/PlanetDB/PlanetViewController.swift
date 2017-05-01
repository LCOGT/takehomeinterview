//
//  PlanetViewController.swift
//  PlanetDB
//
//  Created by Antonio Medrano on 4/27/17.
//  Copyright © 2017 Antonio Medrano. All rights reserved.
//

import UIKit
import os.log

class PlanetViewController: UIViewController, UITextFieldDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    
    //MARK: Properties
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var ordinalityTextField: UITextField!
    @IBOutlet weak var sizeTextField: UITextField!
    @IBOutlet weak var distanceTextField: UITextField!
    @IBOutlet weak var descriptionTextView: UITextView!
    @IBOutlet weak var photoImageView: UIImageView!
    @IBOutlet weak var saveButton: UIBarButtonItem!
    
    /*
     This value is either passed by `PlanetTableViewController` in `prepare(for:sender:)`
     or constructed as part of adding a new planet.
     */
    var planet: Planet?
    
    // Number formatter used for checking input validity
    let numberFormatter: NumberFormatter = {
        let nf = NumberFormatter()
        nf.numberStyle = .decimal
        nf.minimumFractionDigits = 0
        nf.maximumFractionDigits = 1
        return nf
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // Handle the text field’s user input through delegate callbacks.
        nameTextField.delegate = self
        ordinalityTextField.delegate = self
        sizeTextField.delegate = self
        distanceTextField.delegate = self
        descriptionTextView.delegate = self as? UITextViewDelegate
        
        // Set up views if editing an existing Planet.
        if let planet = planet {
            navigationItem.title = planet.name
            nameTextField.text = planet.name
            ordinalityTextField.text = planet.ordinality
            sizeTextField.text = planet.size
            distanceTextField.text = planet.distance
            descriptionTextView.text = planet.descript
            photoImageView.image = planet.photo
        }
        
        // Disable the Save button at the start.
        saveButton.isEnabled = false
        
        // Enable the Save button only if the text field has a valid Planet name.
        updateSaveButtonState()
    }
    
    
    //MARK: UITextFieldDelegate
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        // Hide the keyboard.
        textField.resignFirstResponder()
        return true
    }
    
    //MARK: UITextViewDelegate
    func textViewShouldReturn(_ textView: UITextView) -> Bool {
        // Hide the keyboard.
        textView.resignFirstResponder()
        return true
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        // Disable the Save button while editing.
        //saveButton.isEnabled = false
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        updateSaveButtonState()

        // Define alerts for valid inputs
        let alert1 = UIAlertController(title: "Invalid Input", message: "Please enter a valid positive number", preferredStyle: .alert)
        alert1.addAction(UIAlertAction(title: "Okay, fine...", style: .default) { action in
            // perhaps use action.title here
        })
        let alert2 = UIAlertController(title: "Invalid Input", message: "Please enter a positive integer", preferredStyle: .alert)
        alert2.addAction(UIAlertAction(title: "Okay, fine...", style: .default) { action in
            // perhaps use action.title here
        })
        
        // update title if name is not empty
        if let nameText = nameTextField.text, !nameText.isEmpty {
            navigationItem.title = nameText
        }
        
        // check for valid ordinality input
        if !(ordinalityTextField.text!.isEmpty) {
            print("test: \(ordinalityTextField.text!)")
            let ordinalityText = numberFormatter.number(from: ordinalityTextField.text!)
            let ordinalityNumber = Double(ordinalityTextField.text!)
            if ordinalityText == nil {
                self.present(alert2, animated: true)
                ordinalityTextField.text = nil
            } else if ordinalityNumber! != round(ordinalityNumber!) || ordinalityNumber! < 0.0 {
                self.present(alert2, animated: true)
                ordinalityTextField.text = nil
            }
        }
        
        // check for valid size input
        if !(sizeTextField.text!.isEmpty) {
            let sizeText = numberFormatter.number(from: sizeTextField.text!)
            if sizeTextField.text != nil, sizeText == nil || Double(sizeTextField.text!)! < 0.0 {
                self.present(alert1, animated: true)
                sizeTextField.text = nil
            }
        }
        
        // check for valid distance input
        if !(distanceTextField.text!.isEmpty) {
            let distanceText = numberFormatter.number(from: distanceTextField.text!)
            if distanceText == nil || Double(distanceTextField.text!)! < 0.0 {
                self.present(alert1, animated: true)
                sizeTextField.text = nil
            }
        }
    }
    
    
    //MARK: UIImagePickerControllerDelegate
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        // Dismiss the picker if the user canceled.
        dismiss(animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        
        // The info dictionary may contain multiple representations of the image. You want to use the original.
        guard let selectedImage = info[UIImagePickerControllerOriginalImage] as? UIImage else {
            fatalError("Expected a dictionary containing an image, but was provided the following: \(info)")
        }
        
        // Set photoImageView to display the selected image.
        photoImageView.image = selectedImage
        
        // Dismiss the picker.
        dismiss(animated: true, completion: nil)
    }

    //MARK: Navigation
    @IBAction func cancel(_ sender: UIBarButtonItem) {
        // Depending on style of presentation (modal or push presentation), this view controller needs to be dismissed in two different ways.
        let isPresentingInAddPlanetMode = presentingViewController is UINavigationController
        
        if isPresentingInAddPlanetMode {
            dismiss(animated: true, completion: nil)
        }
        else if let owningNavigationController = navigationController{
            owningNavigationController.popViewController(animated: true)
        }
        else {
            fatalError("The PlanetViewController is not inside a navigation controller.")
        }
    }
    
    // This method lets you configure a view controller before it's presented.
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        super.prepare(for: segue, sender: sender)
        
        // Configure the destination view controller only when the save button is pressed.
        guard let button = sender as? UIBarButtonItem, button === saveButton else {
            os_log("The save button was not pressed, cancelling", log: OSLog.default, type: .debug)
            return
        }
        
        let name = nameTextField.text ?? ""
        let photo = photoImageView.image
        let ordinality = ordinalityTextField.text ?? ""
        let size = sizeTextField.text ?? ""
        let distance = distanceTextField.text ?? ""
        let descript = descriptionTextView.text ?? ""
        
        // Set the planet to be passed to PlanetTableViewController after the unwind segue.
        planet = Planet(name: name, ordinality: ordinality, size: size, distance: distance, descript: descript, photo: photo)
    }


    //MARK: Actions
    @IBAction func selectImageFromPhotoLibrary(_ sender: UITapGestureRecognizer) {
        
        // Hide the keyboard.
        nameTextField.resignFirstResponder()
        
        // UIImagePickerController is a view controller that lets a user pick media from their photo library.
        let imagePickerController = UIImagePickerController()
        
        // Only allow photos to be picked, not taken.
        imagePickerController.sourceType = .photoLibrary
        
        // Make sure ViewController is notified when the user picks an image.
        imagePickerController.delegate = self
        present(imagePickerController, animated: true, completion: nil)
    }

    //MARK: Private Methods
    // THIS IS WHERE I WILL DO THE CHECKING OF THE INPUTS
    private func updateSaveButtonState() {
        // Disable the Save button if the text field is empty.
        let text = nameTextField.text ?? ""
        saveButton.isEnabled = !text.isEmpty
    }
    
}

