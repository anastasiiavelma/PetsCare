package com.example.petscare

import android.os.Build.VERSION.SDK_INT
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import androidx.annotation.IdRes
import androidx.fragment.app.Fragment
import androidx.lifecycle.MutableLiveData
import androidx.navigation.NavController
import androidx.navigation.NavDirections
import androidx.navigation.fragment.findNavController
import androidx.transition.Fade
import androidx.transition.Slide
import androidx.transition.TransitionManager
import androidx.transition.TransitionSet
import java.io.Serializable

/** Use this function instead of navigate(directions: NavDirections). Helps avoid a crash caused by the user quickly tapping 2 (or more) times on a view that triggers an navigation action **/
fun NavController.navigateSafety(
    @IdRes destinationId: Int,
    direction: NavDirections
) {
    if (this.currentDestination?.id == destinationId) {
        this.navigate(direction)
    }
}